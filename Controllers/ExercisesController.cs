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
    }
}