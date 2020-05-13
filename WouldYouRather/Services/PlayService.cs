using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using WouldYouRather.Contexts;
using WouldYouRather.Entities;
using WouldYouRather.Models;

namespace WouldYouRather.Services
{
    public class PlayService
    {
        private readonly Random _random = new Random();
        private readonly GameContext _gameContext;
        private readonly PlayDataService _playData;
        private readonly ILogger<PlayService> _log;

        public PlayService(ILogger<PlayService> log,
                           GameContext gameContext,
                           PlayDataService playDataService)
        {
            _playData = playDataService;
            _gameContext = gameContext;
            _log = log;
        }

        public void LoadGame(string gameId)
        {
            _log.LogInformation($"Loading game {gameId}");
            var game = GetGame(gameId);
            game.StartLobby();
            _gameContext.Games.Update(game);
            _gameContext.SaveChanges();
        }

        public void StartGame(string gameId)
        {
            _log.LogInformation($"Starting game {gameId}");
            var game = GetGame(gameId);
            var player = GetNextPlayer(gameId);
            game.StartPlaying();

            var gameStatus = GetStatus(gameId);
            if (gameStatus == null)
            {
                gameStatus = new GameStatus { Game = game};
                _gameContext.GameState.Add(gameStatus);
            }
            
            _gameContext.Games.Update(game);

            SetNewChoice(gameStatus);
            gameStatus.ChoosingPlayer = player;

            _gameContext.SaveChanges();
        }

        public GameStatusResponse GetStatusResponse(string gameId, string playerId)
        {
            var status = GetStatus(gameId);
            if (status == null) return null;

            var gameStatus = GameStatusResponse.FromStatus(status);

            gameStatus.IsCurrentChoice = status.ChoosingPlayerId == playerId;
            gameStatus.RemainingQuestions = RemainingQuestions(gameId);

            // Return previous choice
            if (!gameStatus.IsCurrentChoice)
            {
                gameStatus.ChoiceA = _playData.GetPreviousChoiceA();
                gameStatus.ChoiceB = _playData.GetPreviousChoiceB();
            } else if (gameStatus.ChoiceA == null || gameStatus.ChoiceB == null)
            {
                // TODO: Something with EF not populating the object, can look at it later
                var choiceA = _gameContext.Answers.Find(status.ChoiceAId);
                var choiceB = _gameContext.Answers.Find(status.ChoiceBId);
                gameStatus.ChoiceA = AnswerResponse.FromAnswer(choiceA);
                gameStatus.ChoiceB = AnswerResponse.FromAnswer(choiceB);
            }

            if (gameStatus.ChoosingPlayer == null)
            {
                var player = _gameContext.Players.Find(status.ChoosingPlayerId);
                if (player != null)
                {
                    gameStatus.ChoosingPlayer = PlayerResponse.FromPlayer(player);
                    gameStatus.ChoosingPlayer.IsChoosing = true;
                }
            }

            return gameStatus;
        }

        public GameStatusResponse MakeChoice(string gameId, int answerId)
        {
            // Update answers, eliminated and increase chosen count
            var status = GetStatus(gameId);
            var choiceA = GetAnswer(status.ChoiceAId);
            var choiceB = GetAnswer(status.ChoiceBId);
            var currentPlayer = status.ChoosingPlayerId;

            if (status.ChoiceAId == answerId)
            {
                choiceA.ChosenCount++;
                choiceB.IsEliminated = true;
            } 
            else if (status.ChoiceBId == answerId)
            {
                choiceB.ChosenCount++;
                choiceA.IsEliminated = true;
            } 
            else
            {
                return null;
            }
            
            // Set previous questions to current questions
            _playData.SetPreviousChoiceA(AnswerResponse.FromAnswer(status.ChoiceA));
            _playData.SetPreviousChoiceB(AnswerResponse.FromAnswer(status.ChoiceB));

            // Get new questions
            SetNewChoice(status);
            
            // New Player
            status.ChoosingPlayer = GetNextPlayer(gameId);

            _gameContext.GameState.Update(status);
            _gameContext.Players.Update(status.ChoosingPlayer);
            _gameContext.SaveChanges();

            return GetStatusResponse(gameId, currentPlayer);
        }

        public GameStatusResponse RejectChoice(string gameId, string playerId)
        {
            var status = GetStatus(gameId);
            
            // Get new answers
            SetNewChoice(status);

            _gameContext.SaveChanges();
            
            return GetStatusResponse(gameId, playerId);
        }

        public GameStatusResponse JoinGame(string gameId, string playerId)
        {
            var player = GetPlayer(playerId);
            if (player == null) return null;

            player.Game = GetGame(gameId);
            _gameContext.Players.Update(player);
            _gameContext.SaveChanges();
            if (_playData.PlayerInQueue(player))
            {
                _playData.AddPlayer(player);
            }

            return GetStatusResponse(gameId, playerId);
        }

        public void RemovePlayer(string gameId, string playerId)
        {
            var player = _gameContext.Players.First(p => p.Id == playerId);
            if (player == null) return;
            _playData.RemovePlayer(player);
            
            _gameContext.Players.Remove(player);
            
            // TODO: If current choosing player, choose a new player
            
            _gameContext.SaveChanges();
        }

        public List<PlayerResponse> GetPlayers(string gameId)
        {
            return _gameContext.Players
                .Where(p => p.GameId == gameId)
                .Select(p => PlayerResponse.FromPlayer(p))
                .ToList();
        }

        public bool IsCurrentPlayer(string gameId, string playerId)
        {
            var status = GetStatus(gameId);

            return status.ChoosingPlayer?.Id == playerId;
        }

        private Player GetNextPlayer(string gameId)
        {
            // Keep in order
            // Check for players added/removed after time
            if (_playData.PlayersQueueEmpty())
            {
                RefreshPlayerQueue(gameId);
                if (_playData.PlayersQueueEmpty())
                {
                    throw new NullReferenceException("No players");
                }
            }

            return _playData.GetNextPlayer();
        }

        private void SetNewChoice(GameStatus status)
        {
            var questions = _gameContext.Answers
                .Where(a => a.GameId == status.GameId && !a.IsEliminated)
                .ToList();

            if (questions.Count == 0)
            {
                throw new InvalidOperationException("No questions");
            }

            status.ChoiceA = questions[_random.Next(questions.Count)];
            status.ChoiceB = questions[_random.Next(questions.Count)];
            
            _log.LogInformation($"New choices: {status.ChoiceA?.Id} and {status.ChoiceB?.Id}");

            if (questions.Count > 1 && status.ChoiceA == status.ChoiceB)
            {
                _log.LogWarning("Duplicate IDs, retrying");
                SetNewChoice(status);
            }
        }

        private Answer GetAnswer(int answerId)
        {
            return _gameContext.Answers.Find(answerId);
        }

        private void RefreshPlayerQueue(string gameId)
        {
            var players = _gameContext.Players
                .Where(p => p.GameId == gameId);
            
            _playData.PopulatePlayerQueue(players);
        }

        private int RemainingQuestions(string gameId)
        {
            return _gameContext.Answers
                .Count(a => a.GameId == gameId && !a.IsEliminated);
        }

        private Player GetPlayer(string playerId)
        {
            return _gameContext.Players.Find(playerId);
        }

        private Game GetGame(string gameId)
        {
            return _gameContext.Games.Find(gameId);
        }

        private GameStatus GetStatus(string gameId)
        {
            return _gameContext.GameState
                .FirstOrDefault(g => g.GameId == gameId);
        }
    }
}