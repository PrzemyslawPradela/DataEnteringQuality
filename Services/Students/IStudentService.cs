using System.Collections.Generic;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services.Users
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAll();
        Student RegisterStudent(Student student);
    }
}