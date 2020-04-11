using System;
using System.Threading.Tasks;
using AutoMapper;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Models;
using DataEnteringQuality.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DataEnteringQuality.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private IStudentService _studentService;
        private IMapper _mapper;

        public StudentsController(
            IStudentService studentService,
            IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]StudentRegisterModel model)
        {
            var student = _mapper.Map<Student>(model);

            try
            {
                await _studentService.RegisterStudent(student);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _studentService.GetAll();
            return Ok(students);
        }
    }
}