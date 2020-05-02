using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using WouldYouRather.Contexts;
using WouldYouRather.Entities;
using WouldYouRather.Models;
using WouldYouRather.Utils;

namespace WouldYouRather.Services
{
    public class PlayerService
    {
        private readonly GameContext _gameContext;
        
        private readonly ILogger<PlayerService> _log;
        
        public PlayerService(ILogger<PlayerService> log, 
                             GameContext gameContext)
        {
            _gameContext = gameContext;
            _log = log;
        }

        public bool IsAdmin(string playerId, string authKey)
        {
            var player = _gameContext.Players.Find(playerId);
            if (player == null) return false;
            return player.AuthKey == authKey && player.IsAdmin;
        }

        public bool IsAuth(string playerId, string authKey)
        {
            var player = _gameContext.Players.Find(playerId);
            if (player == null) return false;
            return player.AuthKey == authKey;
        }
        
        public PlayerResponse GetPlayer(string playerId)
        {
            var player = _gameContext.Players.Find(playerId);

            return player == null ? null : PlayerResponse.FromPlayer(player);
        }
        
        public List<PlayerResponse> GetPlayers()
        {
            _log.LogInformation($"Get all players");
            return _gameContext.Players
                .Select(x => PlayerResponse.FromPlayer(x))
                .ToList();
        }

        public bool RemovePlayer(string playerId)
        {
            _log.LogInformation($"Removing player {playerId}");
            
            var player = _gameContext.Players.Find(playerId);
            if (player == null) return false;
            
            _gameContext.Players.Remove(player);
            _gameContext.SaveChanges();
            return true;
        }

        public Player AddPlayer(string name)
        {
            _log.LogInformation($"Adding new player {name}");
            
            var player = _gameContext.Players.Add(
                new Player
                {
                    Id = KeyUtils.RandomString(12),
                    Name = name,
                    AuthKey = KeyUtils.RandomString(18)
                });
            _gameContext.SaveChanges();

            return player.Entity;
        }
    }
}