using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;

namespace DataEnteringQuality.Services
{
    public class StudentService : IStudentService
    {
        private List<Student> _students;

        public StudentService() => _students = new List<Student>();

        public async Task<IEnumerable<Student>> GetAll()
        {
            return await Task.Run(() => _students.OrderBy(x => x.Surname));
        }

        public async Task<Student> RegisterStudent(Student student)
        {
            if (_students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new Exception("Student with number \"" + student.StudentNumber + "\" already exists");

            student.Id = Guid.NewGuid();

            _students.Add(student);

            return await Task.Run(() => student);
        }
    }
}