namespace WouldYouRather.Entities
{
    public class GameStatus
    {
        public int Id { get; set; }
        public Answer ChoiceA { get; set; }
        public Answer ChoiceB { get; set; }
        public Player ChoosingPlayer { get; set; }
        public Game Game { get; set; }
        public string GameId { get; set; }
    }
}