using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Helpers;

namespace DataEnteringQuality.Services
{
    public class StudentService : IStudentService
    {
        private DataContext _context;

        public StudentService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAll()
        {
            return await Task.Run(() => _context.Students.OrderBy(x => x.Surname));
        }

        public async Task<Student> RegisterStudent(Student student)
        {
            if (_context.Students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new Exception("Student with number \"" + student.StudentNumber + "\" already exists");

            student.Id = Guid.NewGuid();

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return student;
        }
    }
}