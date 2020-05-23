using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringFullResultJsonModel
    {
        [JsonProperty("LICZBA BŁĘDZNIE WPROWADZONYCH WYRAZÓW")]
        public int NumOfMistypedWords { get; set; }

        [JsonProperty("ŚREDNIA LICZBA BŁĘDÓW W WYRAZACH")]
        public string AverageNumOfMistakesInWords { get; set; }
    }
}