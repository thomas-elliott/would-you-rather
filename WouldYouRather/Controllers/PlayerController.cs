using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Models;
using WouldYouRather.Services;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/players")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> _log;

        private PlayerService _playerService;

        public PlayerController(ILogger<PlayerController> log,
                                PlayerService playerService)
        {
            _log = log;
            _playerService = playerService;
        }

        [HttpGet]
        public IActionResult GetPlayers()
        {
            var players = _playerService.GetPlayers();
            return new JsonResult(players);
        }

        [HttpPost]
        public IActionResult RegisterPlayer([FromBody] PlayerRequest request)
        {
            var player = _playerService.AddPlayer(request.Name);
            return new JsonResult(player);
        }

        [HttpDelete("{playerId}")]
        public IActionResult RemovePlayer(string playerId)
        {
            _log.LogInformation($"Deleting player {playerId}");
            var player = _playerService.RemovePlayer(playerId);
            return new JsonResult(player);
        }
    }
}