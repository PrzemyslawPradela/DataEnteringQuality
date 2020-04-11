using System.Threading.Tasks;

namespace DataEnteringQuality.Services.Teachers
{
    public interface ITeacherAuthService
    {
        string AuthenticateTeacher(string username, string password);
    }
}