using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("LICZBA PRÓB")]
        public int NumOfAttempts { get; set; }

        [JsonProperty("WAROŚCI Z ZAKRESU")]
        public string ValuesRange { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA [s]")]
        public int Time { get; set; }
    }
}