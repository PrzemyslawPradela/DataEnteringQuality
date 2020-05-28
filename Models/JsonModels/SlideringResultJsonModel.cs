using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("LICZBA BŁĘDÓW")]
        public int NumOfMistakes { get; set; }

        [JsonProperty("Tm [s]")]
        public string Tm { get; set; }

        [JsonProperty("DOKŁADNOŚĆ USTAWIENIA WSKAŹNIKA")]
        public List<SlideringValuesAccuracyJsonModel> ValuesAccuracy { get; set; }
    }
}