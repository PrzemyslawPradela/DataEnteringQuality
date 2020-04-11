using System.Collections.Generic;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAll();
        Task<Student> RegisterStudent(Student student);
    }
}