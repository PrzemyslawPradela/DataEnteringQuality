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

        public async Task<Student> RegisterStudent(Student student)
        {
            if (_context.Students.Any(x => x.StudentNumber == student.StudentNumber))
                throw new Exception("Student with number \"" + student.StudentNumber + "\" already exists");

            student.Id = Guid.NewGuid();

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            //CreateResultFile(student);

            return student;
        }

        // private void CreateResultFile(Student student)
        // {
        //     string dirPath = "." + Path.DirectorySeparatorChar + "Wyniki" + Path.DirectorySeparatorChar + student.Class;
        //     string resultsPath = dirPath + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";
        //     string groupResultsPath = dirPath + Path.DirectorySeparatorChar + student.Class + ".xlsx";

        //     if (!Directory.Exists(dirPath))
        //         Directory.CreateDirectory(dirPath);

        //     SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

        //     if (File.Exists(groupResultsPath))
        //     {
        //         var groupWorkbook = ExcelFile.Load(groupResultsPath);
        //         var studentWorksheet = groupWorkbook.Worksheets.Add(student.Surname + student.StudentNumber);
        //         groupWorkbook.Save(groupResultsPath);
        //     }
        //     else
        //     {
        //         var groupWorkbook = new ExcelFile();
        //         var studentWorksheet = groupWorkbook.Worksheets.Add(student.Surname + student.StudentNumber);
        //         groupWorkbook.Save(groupResultsPath);
        //     }

        //     var workbook = new ExcelFile();
        //     var worksheet = workbook.Worksheets.Add("");
        //     workbook.Save(resultsPath);
        // }
    }
}