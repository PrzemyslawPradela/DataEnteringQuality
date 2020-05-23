using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingMistakesJsonModel
    {
        [JsonProperty("LICZBA BŁĘDNYCH WSKAZAŃ")]
        public int NumOfMissClick { get; set; }

        [JsonProperty("LICZBA NIEWYKONANYCH PRÓB")]
        public int AttemptsLeft { get; set; }
    }
}