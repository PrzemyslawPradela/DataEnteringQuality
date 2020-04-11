using System;

namespace DataEnteringQuality.Entities
{
    public class Teacher
    {
        public Guid Id { get; set; }
        public string Username => "ita";
        public string Password = "ita";
    }
}