using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("LICZBA PRÓB")]
        public int NumOfAttempts { get; set; }

        [JsonProperty("W [px]")]
        public int W { get; set; }

        [JsonProperty("D [px]")]
        public int D { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA [s]")]
        public int Time { get; set; }
    }
}