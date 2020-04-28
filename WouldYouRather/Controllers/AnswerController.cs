using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Models;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/answers")]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> _log;

        public AnswerController(ILogger<AnswerController> log)
        {
            _log = log;
        }
        
        [HttpGet]
        public JsonResult GetAnswers(string gameId)
        {
            var answer1 = new AnswerResponse
            {
                Id = 1,
                Submitted = DateTime.Now,
                Text = "Test " + gameId,
                ChosenCount = 0,
                IsEliminated = false
            };

            return new JsonResult(answer1);
        }

        [HttpPost]
        public JsonResult PostAnswer(string gameId)
        {
            return new JsonResult("error " + gameId);
        }
    }
}