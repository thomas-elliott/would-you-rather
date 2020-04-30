using WouldYouRather.Entities;

namespace WouldYouRather.Models
{
    public class PlayerResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsChoosing { get; set; }
        public bool IsAdmin { get; set; }

        public static PlayerResponse FromPlayer(Player player)
        {
            return new PlayerResponse
            {
                Id = player.Id,
                Name = player.Name,
                IsAdmin = player.IsAdmin
            };
        }
    }
}