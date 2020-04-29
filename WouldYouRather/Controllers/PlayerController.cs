using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/players")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> _log;

        public PlayerController(ILogger<PlayerController> log)
        {
            _log = log;
        }

        [HttpGet]
        public IActionResult GetPlayers()
        {
            return new JsonResult("Unimplemented");
        }

        [HttpPost]
        public IActionResult RegisterPlayer()
        {
            return new JsonResult("Unimplemented");
        }

        [HttpDelete]
        public IActionResult RemovePlayer()
        {
            return new JsonResult("Unimplemented");
        }
    }
}