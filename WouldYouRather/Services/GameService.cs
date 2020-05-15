using System.Collections.Generic;
using System.Linq;
using WouldYouRather.Contexts;
using WouldYouRather.Entities;
using WouldYouRather.Models;
using WouldYouRather.Utils;

namespace WouldYouRather.Services
{
    public class GameService
    {
        private readonly GameContext _gameContext;
        private readonly Dictionary<string, Game> _currentGames = new Dictionary<string, Game>();

        public GameService(GameContext gameContext)
        {
            _gameContext = gameContext;
        }

        public GameResponse CreateGame()
        {
            var game = new Game
            {
                Id = KeyUtils.RandomString(6)
            };

            _currentGames.Add(game.Id, game);
            _gameContext.Games.Add(game);
            _gameContext.SaveChanges();
            return GameResponse.FromGame(game);
        }

        public List<GameResponse> GetGames()
        {
            return _gameContext.Games.
                Select(x => GameResponse.FromGame(x))
                .ToList();
        }

        public GameResponse GetGame(string gameId)
        {
            return _gameContext.Games
                .Where(x => x.Id == gameId)
                .Select(x => GameResponse.FromGame(x))
                .FirstOrDefault();
        }

        public void UpdateInfo(string gameId, Config config)
        {
            var game = _gameContext.Games
                .First(x => x.Id == gameId);

            game.Config = config;
            _gameContext.Games.Update(game);
            _gameContext.SaveChanges();
        }
    }
}