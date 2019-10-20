using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using cmPOSAPI.Database;
using cmPOSAPI.Models;
using CryptoHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace cmposapi.Controllers
{

    [ApiController]
    [Route("/api/v2/[controller]")]
    public class AuthController : ControllerBase
    {

        ILogger<AuthController> _logger;
        public DatabaseContext Context { get; }
        public IConfiguration Configuration { get; }

        public AuthController(DatabaseContext context, 
        ILogger<AuthController> logger, 
        IConfiguration Configuration)
        {
            Context = context;
            _logger = logger;
            this.Configuration = Configuration;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Users model)
        {
            try
            {
                model.Password = Crypto.HashPassword(model.Password);

                Context.Users.Add(model);
                Context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                _logger.LogError("Failed to execute POST");
                return BadRequest();
            }
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] Users model)
        {
            try
            {
                var result = Context.Users.SingleOrDefault(u => u.Username == model.Username);
                if(result == null){
                    return Unauthorized();
                }

                if (!Crypto.VerifyHashedPassword(result.Password, model.Password))
                {
                    return Unauthorized(); ;
                }

                var token = BuildToken(result);
                return Ok(new {Token = token});
            }
            catch (Exception ex)
            {
                var xxxx = ex.Message.ToString();
                
                _logger.LogError("Failed to execute POST");
                return BadRequest();
            }
        }

        private string BuildToken(Users user)
        {
            // key is case-sensitive
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, Configuration["Jwt:Subject"]),
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("position", user.Position),
                new Claim(ClaimTypes.Role, user.Position)
            };
            
            var expires = DateTime.Now.AddDays(Convert.ToDouble(Configuration["Jwt:ExpireDay"]));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: Configuration["Jwt:Issuer"],
                audience: Configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
   


    }
}