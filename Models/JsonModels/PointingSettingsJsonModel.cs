using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("PARAMETRY")]
        public PointingParamsJsonModel Params { get; set; }
    }
}