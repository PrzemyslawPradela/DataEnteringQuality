using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("PARAMETRY")]
        public EnteringParamsJsonModel Params { get; set; }
    }
}