using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringParamsJsonModel
    {
        [JsonProperty("LICZBA PRÓB")]
        public int NumOfAttempts { get; set; }

        [JsonProperty("WAROŚCI Z ZAKRESU")]
        public string ValuesRange { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA")]
        public string Time { get; set; }
    }
}