using System;

namespace DataEnteringQuality.Entities
{
    public class Student
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int StudentNumber { get; set; }
        public string Class { get; set; }
    }
}