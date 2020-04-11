using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services.Teachers
{
    public interface ITeacherAuthService
    {
        Task<Teacher> AuthenticateTeacher(string username, string password);
    }
}