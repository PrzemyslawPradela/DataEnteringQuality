using System;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using Microsoft.Extensions.Options;

namespace DataEnteringQuality.Services.Teachers
{
    public class TeacherAuthService : ITeacherAuthService
    {
        private Teacher _teacher;

        public TeacherAuthService() => _teacher = new Teacher()
        {
            Id = Guid.NewGuid()
        };

        public async Task<Teacher> AuthenticateTeacher(string username, string password)
        {
            var teacher = _teacher;
            if (!username.Equals(teacher.Username) && !password.Equals(teacher.Password))
                return null;

            return await Task.Run(() => teacher);
        }
    }
}