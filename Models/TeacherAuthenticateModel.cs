using System.ComponentModel.DataAnnotations;

namespace DataEnteringQuality.Models
{
    public class TeacherAuthenticateModel
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Hasło jest wymagane")]
        public string Password { get; set; }
    }
}