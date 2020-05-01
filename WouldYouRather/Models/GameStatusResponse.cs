namespace WouldYouRather.Models
{
    public class GameStatusResponse
    {
        public AnswerResponse ChoiceA { get; set; }
        public AnswerResponse ChoiceB { get; set; }
        public PlayerResponse ChoosingPlayer { get; set; }
        public int RemainingQuestions { get; set; }
    }
}