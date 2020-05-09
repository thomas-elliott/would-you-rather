using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Services;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private ILogger<GameController> _log;

        private readonly GameService _gameService;
        private readonly PlayerService _playerService;
        
        public GameController(ILogger<GameController> log,
                              GameService gameService,
                              PlayerService playerService)
        {
            _log = log;
            _gameService = gameService;
            _playerService = playerService;
        }
        
        [HttpGet]
        public IActionResult GetGames()
        {
            _log.LogInformation("Return all games");
            return new JsonResult(_gameService.GetGames());
        }

        [HttpGet("{gameId}", Name = "GetGameById")]
        public IActionResult GetGame(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            if (game != null)
            {
                return new JsonResult(game);
            }

            _log.LogInformation("Tried to find invalid key");
            return new StatusCodeResult(404);
        }

        [HttpPost]
        public IActionResult CreateGame()
        {
            if (!_playerService.IsAdmin(
                Request.Headers["x-player-id"],
                Request.Headers["x-auth-key"]
            ))
            {
                return new StatusCodeResult(403);
            }
            
            var game = _gameService.CreateGame();
            
            _log.LogInformation("Created new game");
            return CreatedAtRoute("GetGameById", new { gameId = game.Id }, game);
        }
    }
}