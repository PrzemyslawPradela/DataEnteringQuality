using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public interface IAuthService
    {
        Task<User> Authenticate(string username, string password);
    }
}