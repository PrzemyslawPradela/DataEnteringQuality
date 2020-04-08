using System.Collections.Generic;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services.Users
{
    public interface IStudentService
    {
        IEnumerable<Student> GetAll();
        Task RegisterStudent(Student student);
    }
}