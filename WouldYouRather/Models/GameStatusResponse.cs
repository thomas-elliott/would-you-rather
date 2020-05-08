using WouldYouRather.Entities;

namespace WouldYouRather.Models
{
    public class GameStatusResponse
    {
        public AnswerResponse ChoiceA { get; set; }
        public AnswerResponse ChoiceB { get; set; }
        public PlayerResponse ChoosingPlayer { get; set; }
        public int RemainingQuestions { get; set; }
        public bool IsCurrentChoice { get; set; }
        public bool CanReject { get; set; } 

        public static GameStatusResponse FromStatus(GameStatus status)
        {
            return new GameStatusResponse
            {
                ChoiceA = AnswerResponse.FromAnswer(status.ChoiceA),
                ChoiceB = AnswerResponse.FromAnswer(status.ChoiceB),
                ChoosingPlayer = PlayerResponse.FromPlayer(status.ChoosingPlayer)
            };
        }
    }
}