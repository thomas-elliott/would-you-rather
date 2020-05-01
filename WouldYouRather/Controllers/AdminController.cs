using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WouldYouRather.Services;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/admin")]
    public class AdminController : ControllerBase
    {
        private readonly ILogger<AdminController> _log;

        private readonly PlayerService _playerService;

        public AdminController(ILogger<AdminController> log,
                               PlayerService playerService)
        {
            _log = log;
            _playerService = playerService;
        }
    }
}