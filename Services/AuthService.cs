using System;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public class AuthService : IAuthService
    {
        private Teacher _teacher;

        public AuthService() => _teacher = new Teacher()
        {
            Id = Guid.NewGuid()
        };

        public async Task<Teacher> AuthenticateTeacher(string username, string password)
        {
            var teacher = _teacher;
            if (!username.Equals(teacher.Username) && !password.Equals(teacher.Password))
                return null;

            teacher.Password = null;

            return await Task.Run(() => teacher);
        }
    }
}