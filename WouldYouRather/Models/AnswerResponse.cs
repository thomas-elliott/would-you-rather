using System;
using System.ComponentModel.DataAnnotations;

namespace WouldYouRather.Models
{
    public class AnswerResponse
    {
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime Submitted { get; set; }
        [Required(ErrorMessage = "Some text should be provided")]
        public string Text { get; set; }
        public bool IsEliminated { get; set; }
        public int ChosenCount { get; set; }
    }
}