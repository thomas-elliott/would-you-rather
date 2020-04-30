using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Models;
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
        public IActionResult GetAnswers(string gameId)
        {
            _log.LogInformation("Return answers");
            return new JsonResult(_answerService.GetAnswers(gameId));
        }

        [HttpPost]
        public IActionResult PostAnswer(string gameId,
                                        [FromBody] AnswerRequest answer)
        {
            _log.LogInformation($"Add an answer to {gameId}: {answer.Answer}");
            if (answer.Answer == null)
            {
                return new StatusCodeResult(400);
            }
            var ans = _answerService.AddAnswer(answer.Answer, gameId);
            if (ans == null)
            {
                return new StatusCodeResult(404);
            }
            
            return new JsonResult(ans);
        }
    }
}