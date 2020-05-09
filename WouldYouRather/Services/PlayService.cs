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
        private readonly ILogger<PlayService> _log;

        public PlayService(ILogger<PlayService> log,
                           GameContext gameContext)
        {
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
            game.StartPlaying();

            var gameStatus = GetStatus(gameId);
            if (gameStatus == null)
            {
                gameStatus = new GameStatus { Game = game};
                _gameContext.GameState.Add(gameStatus);                
            }
            
            _gameContext.Games.Update(game);

            SetNewChoice(gameStatus);

            _gameContext.SaveChanges();
        }

        public GameStatusResponse GetStatusResponse(string gameId, string playerId)
        {
            var status = GetStatus(gameId);
            if (status == null) return null;

            var gameStatus = GameStatusResponse.FromStatus(status);
            gameStatus.IsCurrentChoice = gameStatus.ChoosingPlayer?.Id == playerId;
            gameStatus.RemainingQuestions = RemainingQuestions(gameId);

            return gameStatus;
        }

        public GameStatusResponse MakeChoice()
        {
            // Update answers, eliminated and increase chosen count
            
            // Get new questions

            throw new NotImplementedException();
        }

        public GameStatusResponse RejectChoice()
        {
            // Get new answers
            
            throw new NotImplementedException();
        }

        public GameStatusResponse JoinGame(string gameId, string playerId)
        {
            var player = GetPlayer(playerId);
            if (player == null) return null;

            player.Game = GetGame(gameId);
            _gameContext.Players.Update(player);
            _gameContext.SaveChanges();

            return GetStatusResponse(gameId, playerId);
        }

        public void RemovePlayer(string gameId, string playerId)
        {
            var player = _gameContext.Players.First(p => p.Id == playerId);
            if (player == null) return;
            
            _gameContext.Players.Remove(player);
            _gameContext.SaveChanges();
        }

        public List<PlayerResponse> GetPlayers(string gameId)
        {
            return _gameContext.Players
                .Where(p => p.GameId == gameId)
                .Select(p => PlayerResponse.FromPlayer(p))
                .ToList();
        }

        private Player GetNextPlayer()
        {
            // Keep in order
            // Check for players added/removed after time
            
            throw new NotImplementedException();            
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