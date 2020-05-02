using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Services;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/play/{gameId}")]
    public class PlayController : ControllerBase
    {
        private readonly ILogger<PlayController> _log;
        private readonly PlayService _playService;
        private readonly PlayerService _playerService;

        public PlayController(ILogger<PlayController> log,
                              PlayService playService,
                              PlayerService playerService)
        {
            _log = log;
            _playService = playService;
            _playerService = playerService;
        }
        
        [HttpGet]
        public IActionResult GetStatus(string gameId)
        {
            var playerId = Request.Headers["x-player-id"];
            var authKey = Request.Headers["x-auth-key"];
            if (!_playerService.IsAuth(playerId, authKey))
            {
                return new StatusCodeResult(401);
            }
            
            _log.LogInformation($"GetStatus for game {gameId}");
            var status = _playService.GetStatus(gameId, playerId);
            
            return new JsonResult(status);
        }

        [HttpPost]
        public IActionResult JoinGame(string gameId)
        {
            var playerId = Request.Headers["x-player-id"];
            var authKey = Request.Headers["x-auth-key"];
            if (!_playerService.IsAuth(playerId, authKey))
            {
                return new StatusCodeResult(401);
            }

            _log.LogInformation($"Player {playerId} joining game {gameId}");
            var status = _playService.JoinGame(gameId, playerId);

            return new JsonResult(status);
        }

        [HttpDelete("players/{playerId}")]
        public IActionResult RemovePlayer(string gameId, string playerId)
        {
            if (!_playerService.IsAdmin(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
            ))
            {
                return new StatusCodeResult(403);
            }
            
            _log.LogInformation($"Removing {playerId} from {gameId}");
            
            _playService.RemovePlayer(gameId, playerId);
            
            return new StatusCodeResult(204);
        }

        [HttpGet("players")]
        public IActionResult GetPlayers(string gameId)
        {
            var players = _playService.GetPlayers(gameId);
            _log.LogInformation("Returning players");
            
            return new JsonResult(players);
        }

        [HttpPost("load")]
        public IActionResult LoadGame(string gameId)
        {
            if (!_playerService.IsAdmin(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
            ))
            {
                return new StatusCodeResult(403);
            }
            
            _log.LogInformation($"Loading game {gameId}");
            _playService.LoadGame(gameId);
            return new StatusCodeResult(200);
        }

        [HttpPost("start")]
        public IActionResult StartGame(string gameId)
        {
            if (!_playerService.IsAdmin(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
            ))
            {
                return new StatusCodeResult(403);
            }
            
            _log.LogInformation($"Starting game {gameId}");
            _playService.StartGame(gameId);
            return new StatusCodeResult(200);
        }
    }
}