using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Helpers;
using Microsoft.Extensions.Options;

namespace DataEnteringQuality.Services.Users
{
    public class StudentService : IStudentService
    {
        private AppSettings _appSettings;
        private List<Student> _students;

        public StudentService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _students = new List<Student>();
        }

        public IEnumerable<Student> GetAll() => _students.OrderBy(x => x.Surname);

        public Task RegisterStudent(Student student)
        {
            if (_students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new AppException("Student with number \"" + student.StudentNumber + "\" already exists");
        }
    }