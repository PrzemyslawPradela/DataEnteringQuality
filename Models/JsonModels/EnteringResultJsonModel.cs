using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("CPS")]
        public string CPS { get; set; }

        [JsonProperty("WPM")]
        public string WPM { get; set; }

        [JsonProperty("PRAWDOPODOBIEŃSTWO BŁĘDU")]
        public string MistakeProbability { get; set; }
    }
}