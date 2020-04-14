using System;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public class AuthService : IAuthService
    {
        private User _user;

        public AuthService() => _user = new User()
        {
            Id = Guid.NewGuid()
        };

        public async Task<User> Authenticate(string username, string password)
        {
            var user = _user;
            if (!username.Equals(user.Username) && !password.Equals(user.Password))
                return null;

            user.Password = null;

            return await Task.Run(() => user);
        }
    }
}