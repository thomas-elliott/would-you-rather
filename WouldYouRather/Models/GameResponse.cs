using System.Runtime.CompilerServices;
using WouldYouRather.Entities;

namespace WouldYouRather.Models
{
    public class GameResponse
    {
        public string Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsAcceptingSubmissions { get; set; }

        public static GameResponse FromGame(Game game)
        {
            return new GameResponse()
            {
                Id = game.Id,
                IsActive = game.IsActive,
                IsAcceptingSubmissions = game.IsAcceptingSubmissions
            };
        }
    }
}