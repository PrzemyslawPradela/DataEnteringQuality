using System;
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
        private List<Student> _students;

        public StudentService() => _students = new List<Student>();

        public async Task<IEnumerable<Student>> GetAll()
        {
            return await Task.Run(() => _students.OrderBy(x => x.Surname));
        }

        public Student RegisterStudent(Student student)
        {
            if (_students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new AppException("Student with number \"" + student.StudentNumber + "\" already exists");

            student.Id = Guid.NewGuid();

            _students.Add(student);

            return student;
        }
    }