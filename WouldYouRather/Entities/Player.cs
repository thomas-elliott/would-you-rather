using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WouldYouRather.Entities
{
    public class Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public string AuthKey { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public Game Game { get; set; }
        public string GameId { get; set; }
    }
}