using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Models;

namespace DataEnteringQuality.Services
{
    public interface IExerciseService
    {
        Task SaveSlideringTestSettings(SlideringSettingsModel settings, Student student);
        Task SaveSlideringTestResult(SlideringResultModel result, Student student);
    }
}