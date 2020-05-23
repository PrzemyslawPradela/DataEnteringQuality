using System.Threading.Tasks;
using DataEnteringQuality.Models;
using DataEnteringQuality.Services;
using Microsoft.AspNetCore.Mvc;

namespace DataEnteringQuality.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExercisesController : ControllerBase
    {
        private IExerciseService _exerciseService;
        private IStudentService _studentService;

        public ExercisesController(IExerciseService exerciseService, IStudentService studentService)
        {
            _exerciseService = exerciseService;
            _studentService = studentService;
        }

        [HttpPost("slidering/{id}/settings")]
        public async Task<IActionResult> SaveSlideringSettings(string id, SlideringSettingsModel model)
        {
            var student = await _studentService.GetStudentById(id);
            await _exerciseService.SaveSlideringTestSettings(model, student);
            return Ok();
        }

        [HttpPost("slidering/{id}/result")]
        public async Task<IActionResult> SaveSlideringResult(string id, SlideringResultModel model)
        {
            var student = await _studentService.GetStudentById(id);
            await _exerciseService.SaveSlideringTestResult(model, student);
            return Ok();
        }

        [HttpGet("slidering/{id}/result/download")]
        public async Task<FileResult> DownloadSlideringResult(string id)
        {
            var student = await _studentService.GetStudentById(id);
            byte[] fileBytes = await _exerciseService.DownloadSlideringTestResult(student);
            string fileName = student.Surname + "_" + student.StudentNumber + "_TEST_PRZECIAGANIA.xlsx";
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName); ;
        }

        [HttpPost("pointing/{id}/settings")]
        public async Task<IActionResult> SavePointingSettings(string id, PointingSettingsModel model)
        {
            var student = await _studentService.GetStudentById(id);
            await _exerciseService.SavePointingTestSettings(model, student);
            return Ok();
        }

        [HttpPost("pointing/{id}/result")]
        public async Task<IActionResult> SavePointingResult(string id, PointingResultModel model)
        {
            var student = await _studentService.GetStudentById(id);
            await _exerciseService.SavePointingTestResult(model, student);
            return Ok();
        }

        [HttpGet("pointing/{id}/result/download")]
        public async Task<FileResult> DownloadPointingResult(string id)
        {
            var student = await _studentService.GetStudentById(id);
            byte[] fileBytes = await _exerciseService.DownloadPointingTestResult(student);
            string fileName = student.Surname + "_" + student.StudentNumber + "_TEST_WSKAZYWANIA.xlsx";
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName); ;
        }

        [HttpPost("entering/{id}/settings")]
        public async Task<IActionResult> SaveEnteringSettings(string id, EnteringSettingsModel model)
        {
            var student = await _studentService.GetStudentById(id);
            var words = await _exerciseService.SaveEnteringTestSettings(model, student);
            return Ok(words);
        }

        [HttpPost("entering/{id}/result")]
        public async Task<IActionResult> SaveEnteringResult(string id, EnteringResultModel model)
        {
            var student = await _studentService.GetStudentById(id);
            await _exerciseService.SaveEnteringTestResult(model, student);
            return Ok();
        }

        [HttpGet("entering/{id}/result/download")]
        public async Task<FileResult> DownloadEnteringResult(string id)
        {
            var student = await _studentService.GetStudentById(id);
            byte[] fileBytes = await _exerciseService.DownloadEnteringTestResult(student);
            string fileName = student.Surname + "_" + student.StudentNumber + "_TEST_WPROWADZANIA.xlsx";
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName); ;
        }

    }
}