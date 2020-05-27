using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringFullResultJsonModel
    {
        [JsonProperty("LICZBA WPROWADZONYCH WYRAZÓW")]
        public int NumOfEnteredWords { get; set; }

        [JsonProperty("LICZBA BŁĘDNIE WPROWADZONYCH WYRAZÓW")]
        public int NumOfMistypedWords { get; set; }

        [JsonProperty("ŚREDNIA LICZBA BŁĘDÓW W WYRAZACH")]
        public string AverageNumOfMistakesInWords { get; set; }
    }
}