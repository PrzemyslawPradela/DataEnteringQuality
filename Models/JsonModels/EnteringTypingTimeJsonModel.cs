using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringTypingTimeJsonModel
    {
        [JsonProperty("CZAS WPROWADZANIA WYRAZÓW [ms]")]
        public int TypingTime { get; set; }
    }
}