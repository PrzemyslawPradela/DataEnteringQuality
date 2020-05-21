using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringFullResultJsonModel
    {
        [JsonProperty("LICZBA BŁĘDÓW")]
        public int NumOfMistakes { get; set; }

        [JsonProperty("DOKŁADNOŚĆ USTAWIENIA WSKAŹNIKA")]
        public List<SlideringValuesAccuracyJsonModel> ValuesAccuracy { get; set; }
    }
}