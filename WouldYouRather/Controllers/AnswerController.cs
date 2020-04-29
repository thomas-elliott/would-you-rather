using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Services;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/answers")]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> _log;
        private readonly AnswerService _answerService;

        public AnswerController(ILogger<AnswerController> log,
                                AnswerService answerService)
        {
            _log = log;
            _answerService = answerService;
        }
        
        [HttpGet]
        public JsonResult GetAnswers(string gameId)
        {
            return new JsonResult(_answerService.GetAnswers(gameId));
        }

        [HttpPost]
        public JsonResult PostAnswer(string gameId,
                                     [FromBody] string text)
        {
            var answer = _answerService.AddAnswer(text, gameId);
            
            return new JsonResult(answer);
        }
    }
}