using System;
using System.ComponentModel.DataAnnotations;
using WouldYouRather.Entities;

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

        public static AnswerResponse FromAnswer(Answer answer)
        {
            return new AnswerResponse()
            {
                Id = answer.Id,
                Submitted = answer.Submitted,
                ChosenCount = answer.ChosenCount,
                IsEliminated = answer.IsEliminated,
                Text = answer.Text
            };
        }
    }
}