using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WouldYouRather.Entities
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        public string Key { get; set; }
        public bool IsActive { get; set; }
        public bool IsAcceptingSubmissions { get; set; }
        [ForeignKey("AnswerId")]
        public List<Answer> Answers { get; set; }
    }
}