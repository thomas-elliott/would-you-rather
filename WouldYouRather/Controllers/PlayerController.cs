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
        public JsonResult GetPlayers()
        {
            return new JsonResult("Unimplemented");
        }

        [HttpPost]
        public JsonResult RegisterPlayer()
        {
            return new JsonResult("Unimplemented");
        }

        [HttpDelete]
        public JsonResult RemovePlayer()
        {
            return new JsonResult("Unimplemented");
        }
    }
}