using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using WouldYouRather.Models;

namespace WouldYouRather.Services
{
    public class GameService
    {
        private readonly Dictionary<string, GameResponse> _currentGames = new Dictionary<string, GameResponse>();

        public GameService()
        {
            CreateGame();
        }

        public void CreateGame()
        {
            var game = new GameResponse
            {
                Id = "hqt309g",
                IsActive = false,
                IsAcceptingSubmissions = false
            };
            
            _currentGames.Add(game.Id, game);
        }

        public List<GameResponse> GetGames()
        {
            return _currentGames.Values.ToList();
        }

        public GameResponse GetGame(string gameId)
        {
            return _currentGames.GetValueOrDefault(gameId);
        }
    }
}