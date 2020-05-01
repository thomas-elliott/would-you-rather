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

        private Game _game;
        private List<Player> _players = new List<Player>();

        public PlayService(ILogger<PlayService> log,
                           GameContext gameContext)
        {
            _gameContext = gameContext;
            _log = log;
        }

        public void LoadGame(string gameId)
        {
            _game = GetGame(gameId);
        }

        public void StartGame(string gameId)
        {
            if (_game == null || _game.Id != gameId)
            {
                LoadGame(gameId);
            }

            // TODO: Save this back to the database?
            _game.IsPlaying = true;
        }

        public GameStatusResponse GetStatus(string gameId, string playerId)
        {
            if (_game == null || _game.Id != gameId)
            {
                return null;
            }
            
            var status = new GameStatusResponse
            {
                
            };
            throw new NotImplementedException();

            return status;
        }

        public GameStatusResponse MakeChoice()
        {
            var status = new GameStatusResponse { };

            throw new NotImplementedException();
            return status;
        }

        public GameStatusResponse JoinGame(string gameId, string playerId)
        {
            if (gameId != _game?.Id)
            {
                return null;
            }

            var player = GetPlayer(playerId);

            if (player != null)
            {
                _players.Add(player);
            }

            return GetStatus(gameId, playerId);
        }

        public void RemovePlayer(string gameId, string playerId)
        {
            if (_game == null || _game.Id != gameId)
            {
                return;
            }

            var player = _players.First(p => p.Id == playerId);
            if (player != null)
            {
                _players.Remove(player);
            }
        }

        public List<PlayerResponse> GetPlayers(string gameId)
        {
            if (_game == null || _game.Id != gameId)
            {
                return null;
            }

            return _players.ConvertAll(PlayerResponse.FromPlayer);
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