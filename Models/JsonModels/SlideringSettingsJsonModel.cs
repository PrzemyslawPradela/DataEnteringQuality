using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("PARAMETRY")]
        public SlideringParamsJsonModel Params { get; set; }
    }
}