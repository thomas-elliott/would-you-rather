using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WouldYouRather.Entities
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime Submitted { get; set; }
        [MaxLength(2000)]
        public string Text { get; set; }
        public bool IsEliminated { get; set; }
        public int ChosenCount { get; set; }
        [ForeignKey("GameId")]
        public Game Game { get; set; }
    }
}