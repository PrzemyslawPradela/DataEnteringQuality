using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringValuesAccuracyJsonModel
    {
        [JsonProperty("C0")]
        public int ValueToSet { get; set; }

        [JsonProperty("C")]
        public string ValueFromTest { get; set; }

        [JsonProperty("γ")]
        public string Bb { get; set; }

        [JsonProperty("d")]
        public string Bw { get; set; }
    }
}