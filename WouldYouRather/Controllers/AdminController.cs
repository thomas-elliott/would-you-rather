using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WouldYouRather.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/admin")]
    public class AdminController : ControllerBase
    {
        private readonly ILogger<AdminController> _log;

        public AdminController(ILogger<AdminController> log)
        {
            _log = log;
        }
    }
}