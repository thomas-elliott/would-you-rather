using System.Runtime.CompilerServices;

namespace WouldYouRather.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public string AuthId { get; set; }
        public string AuthKey { get; set; }
        public string Name { get; set; }
    }
}