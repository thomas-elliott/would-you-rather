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

        [HttpGet("{playerId}")]
        public IActionResult GetPlayer(string playerId)
        {
            var player = _playerService.GetPlayer(playerId);

            if (player == null)
            {
                return new StatusCodeResult(404);
            }
            
            if (!_playerService.IsAuth(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
            ))
            {
                return new StatusCodeResult(403);
            }
            
            return new JsonResult(player);
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
            if (!_playerService.IsAdmin(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
                ))
            {
                return new StatusCodeResult(403);
            }
            _log.LogInformation($"Deleting player {playerId}");
            var player = _playerService.RemovePlayer(playerId);
            return new JsonResult(player);
        }
    }
}