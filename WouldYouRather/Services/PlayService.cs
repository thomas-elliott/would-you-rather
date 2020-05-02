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
            _gameContext.Games.Update(game);
            _gameContext.SaveChanges();
        }

        public GameStatusResponse GetStatus(string gameId, string playerId)
        {
            var status = _gameContext.GameState
                .FirstOrDefault(g => g.GameId == gameId);

            if (status == null) return null;
            
            var gameStatus = GameStatusResponse.FromStatus(status);
            gameStatus.IsCurrentChoice = gameStatus.ChoosingPlayer.Id == playerId;
            gameStatus.RemainingQuestions = RemainingQuestions(gameId);

            return gameStatus;
        }

        public GameStatusResponse MakeChoice()
        {
            var status = new GameStatusResponse { };

            throw new NotImplementedException();
            return status;
        }

        public GameStatusResponse RejectChoice()
        {
            throw new NotImplementedException();
        }

        public GameStatusResponse JoinGame(string gameId, string playerId)
        {
            var player = GetPlayer(playerId);

            if (player == null)
            {
                return null;
            }

            player.Game = GetGame(gameId);
            _gameContext.Players.Update(player);
            _gameContext.SaveChanges();

            return GetStatus(gameId, playerId);
        }

        public void RemovePlayer(string gameId, string playerId)
        {
            var player = _gameContext.Players.First(p => p.Id == playerId);
            if (player != null)
            {
                _gameContext.Players.Remove(player);
                _gameContext.SaveChanges();
            }
        }

        public List<PlayerResponse> GetPlayers(string gameId)
        {
            return _gameContext.Players
                .Where(p => p.GameId == gameId)
                .Select(p => PlayerResponse.FromPlayer(p))
                .ToList();
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
    }
}