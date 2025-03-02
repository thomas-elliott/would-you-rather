namespace WouldYouRather.Entities
{
    public class GameStatus
    {
        public int Id { get; set; }
        public Answer ChoiceA { get; set; }
        public int ChoiceAId { get; set; }
        public Answer ChoiceB { get; set; }
        public int ChoiceBId { get; set; }
        public Player ChoosingPlayer { get; set; }
        public string ChoosingPlayerId { get; set; }
        public Game Game { get; set; }
        public string GameId { get; set; }
    }
}