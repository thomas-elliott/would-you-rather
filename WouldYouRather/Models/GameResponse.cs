using WouldYouRather.Entities;

namespace WouldYouRather.Models
{
    public class GameResponse
    {
        public string Id { get; set; }
        public bool IsPlaying { get; set; }
        public bool IsLobbyOpen { get; set; }
        public bool IsAcceptingSubmissions { get; set; }

        public static GameResponse FromGame(Game game)
        {
            return new GameResponse()
            {
                Id = game.Id,
                IsPlaying = game.IsPlaying,
                IsLobbyOpen = game.IsLobbyOpen,
                IsAcceptingSubmissions = game.IsAcceptingSubmissions
            };
        }
    }
}