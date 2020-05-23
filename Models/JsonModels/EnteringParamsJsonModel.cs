using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringParamsJsonModel
    {
        [JsonProperty("LICZBA WYRAZÓW")]
        public int NumOfWords { get; set; }

        [JsonProperty("DŁUGOŚĆ WYRAZÓW")]
        public int WordLength { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA")]
        public string Time { get; set; }
    }
}