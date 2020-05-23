using System.Threading.Tasks;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Models;

namespace DataEnteringQuality.Services
{
    public interface IExerciseService
    {
        Task SaveSlideringTestSettings(SlideringSettingsModel settings, Student student);
        Task SaveSlideringTestResult(SlideringResultModel result, Student student);
        Task SavePointingTestSettings(PointingSettingsModel settings, Student student);
        Task SavePointingTestResult(PointingResultModel result, Student student);
        Task<string[]> SaveEnteringTestSettings(EnteringSettingsModel settings, Student student);
        Task SaveEnteringTestResult(EnteringResultModel result, Student student);
    }
}