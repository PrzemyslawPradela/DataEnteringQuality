using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public interface IAuthService
    {
        Task<Teacher> AuthenticateTeacher(string username, string password);
    }
}