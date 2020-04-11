using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DataEnteringQuality.Services.Teachers
{
    public class TeacherAuthService : ITeacherAuthService
    {
        private Teacher _teacher;
        private readonly AppSettings _appSettings;

        public TeacherAuthService(IOptions<AppSettings> appSettings)
        {
            _teacher = new Teacher();
            _appSettings = appSettings.Value;
        }

        public string AuthenticateTeacher(string username, string password)
        {
            if (!username.Equals(_teacher.Username) && !password.Equals(_teacher.Password))
                throw new AppException("Username or password is incorrect");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,_teacher.Username),
                    new Claim(ClaimTypes.Role, _teacher.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            _teacher.Token = tokenHandler.WriteToken(token);

            return _teacher.Token;
        }
    }
}