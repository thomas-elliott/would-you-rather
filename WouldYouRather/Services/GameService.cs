using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;
using WouldYouRather.Contexts;
using WouldYouRather.Entities;
using WouldYouRather.Models;

namespace WouldYouRather.Services
{
    public class GameService
    {
        private readonly GameContext _gameContext;
        private readonly Dictionary<string, Game> _currentGames = new Dictionary<string, Game>();
        
        private static Random _random = new Random();

        public GameService(GameContext gameContext)
        {
            _gameContext = gameContext;
        }

        public GameResponse CreateGame()
        {
            var game = new Game
            {
                Id = RandomString(6)
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

        // TODO: Don't use something from StackExchange, make it securerandom especially for keys
        private string RandomString(int length)
        {
            const string charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(charset, length).Select(s => s[_random.Next(s.Length)]).ToArray());
        }
    }
}