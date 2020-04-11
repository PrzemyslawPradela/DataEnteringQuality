using System.ComponentModel.DataAnnotations;

namespace DataEnteringQuality.Models
{
    public class StudentRegisterModel
    {
        [Required(ErrorMessage = "Imię jest wymagana")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Nazwisko jest wymagane")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Numer indeksu jest wymagany")]
        public int StudentNumber { get; set; }

        [Required(ErrorMessage = "Grupa jest wymagana")]
        public string Class { get; set; }
    }
}