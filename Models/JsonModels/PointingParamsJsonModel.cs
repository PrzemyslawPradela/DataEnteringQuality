using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingParamsJsonModel
    {
        [JsonProperty("LICZBA PRÓB")]
        public int NumOfAttempts { get; set; }

        [JsonProperty("SZEROKOŚĆ PRZYCISKÓW")]
        public string BtnWidth { get; set; }

        [JsonProperty("ODLEGŁOŚĆ MIĘDZY PRZYCISKAMI")]
        public string BtnDistance { get; set; }

        [JsonProperty("CZAS NA WYKONANIE ZADANIA")]
        public string Time { get; set; }
    }
}