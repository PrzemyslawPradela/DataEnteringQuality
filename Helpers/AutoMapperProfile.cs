using AutoMapper;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Models;

namespace DataEnteringQuality.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<StudentRegisterModel, Student>();
        }
    }
}