using System;

namespace DataEnteringQuality.Entities
{
    public class Teacher
    {
        public Guid Id { get; set; }
        public string Username => "nauczyciel";
        public string Password => "ita";
    }
}