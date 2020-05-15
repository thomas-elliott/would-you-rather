namespace WouldYouRather.Entities
{
    public class Config
    {
        public string SubmitMessage { get; set; }
        public string SubmitSuccessMessage { get; set; }
        public string SubmitSuccessButton { get; set; }
        public string SubmitErrorMessage { get; set; }

        public override string ToString()
        {
            return $"SubmitMessage: {SubmitMessage}\nSubmitSuccessMessage: {SubmitSuccessMessage}\nSubmitSuccessButton: {SubmitSuccessButton}\nSubmitErrorMessage: {SubmitErrorMessage}";
        }
    }
}