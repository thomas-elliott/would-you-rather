using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WouldYouRather.Entities
{
    public class Game
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public bool IsAcceptingSubmissions { get; set; }
        public bool IsLobbyOpen { get; set; }
        public bool IsPlaying { get; set; }
        [Column(TypeName = "jsonb")]
        public Config Config { get; set; }
        public List<Answer> Answers { get; set; }
    }
}