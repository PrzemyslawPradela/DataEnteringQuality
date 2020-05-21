using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Helpers;
using GemBox.Spreadsheet;

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

        public async Task<Student> GetStudentById(string studentId)
        {
            return await Task.Run(() => _context.Students.FirstOrDefault(x => x.Id.ToString() == studentId));
        }

        public async Task<Student> RegisterStudent(Student student)
        {
            if (_context.Students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new Exception("Student with number \"" + student.StudentNumber + "\" already exists");

            student.Id = Guid.NewGuid();

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            CreateResultFile(student);

            return student;
        }

        private void CreateResultFile(Student student)
        {
            List<string> tests = new List<string>()
            {
                "TEST_WPROWADZANIA",
                "TEST_WSKAZYWANIA",
                "TEST_PRZECIAGANIA"
            };

            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            foreach (var item in tests)
            {
                Directory.CreateDirectory(dirPath + item);
            }

            SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

            foreach (var item in tests)
            {
                var workbook = new ExcelFile();
                workbook.Worksheets.Add("WYNIKI");
                workbook.Worksheets.Add("PARAMETRY");
                workbook.Save(dirPath + item + resultsPath);
            }
        }
    }
}