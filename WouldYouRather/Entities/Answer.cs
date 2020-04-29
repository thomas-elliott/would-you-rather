using System;
using System.ComponentModel.DataAnnotations;

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
        public Game Game { get; set; }
        public string GameId { get; set; }
    }
}