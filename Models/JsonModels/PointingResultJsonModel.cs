using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("LICZBA BŁĘDNYCH WSKAZAŃ")]
        public int NumOfMissClick { get; set; }

        [JsonProperty("LICZBA NIEWYKONANYCH PRÓB")]
        public int AttemptsLeft { get; set; }

        [JsonProperty("We")]
        public string We { get; set; }

        [JsonProperty("ID [bit]")]
        public string ID { get; set; }

        [JsonProperty("IDe [bit]")]
        public string IDe { get; set; }

        [JsonProperty("Tm [s]")]
        public string Tm { get; set; }

        [JsonProperty("Pw [bit/s]")]
        public string Pw { get; set; }

        [JsonProperty("Vp [px/s]")]
        public string Vp { get; set; }
    }
}