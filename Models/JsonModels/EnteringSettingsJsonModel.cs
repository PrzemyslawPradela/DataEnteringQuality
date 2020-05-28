using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringSettingsJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("LICZBA WYRAZÓW")]
        public int NumOfWords { get; set; }

        [JsonProperty("DŁUGOŚĆ WYRAZÓW")]
        public int WordLength { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA [s]")]
        public int Time { get; set; }
    }
}