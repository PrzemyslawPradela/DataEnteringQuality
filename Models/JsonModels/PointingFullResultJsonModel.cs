using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingFullResultJsonModel
    {
        [JsonProperty("LICZBA BŁĘDNYCH WSKAZAŃ")]
        public int NumOfMissClick { get; set; }

        [JsonProperty("LICZBA NIEWYKONANYCH PRÓB")]
        public int AttemptsLeft { get; set; }

        [JsonProperty("WSKAŹNIK TRUDNOŚCI")]
        public List<PointingIDJsonModel> IDs { get; set; }
    }
}