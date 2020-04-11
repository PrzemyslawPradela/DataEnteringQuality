using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataEnteringQuality.Models;
using DataEnteringQuality.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DataEnteringQuality.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
        {
            var user = await _authService.AuthenticateTeacher(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

    }
}
