using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingIDJsonModel
    {
        [JsonProperty("SZEROKOŚĆ PRZYCISKÓW")]
        public string BtnWidth { get; set; }

        [JsonProperty("ODLEGŁOŚĆ MIĘDZY PRZYCISKAMI")]
        public string BtnDistance { get; set; }

        [JsonProperty("ID")]
        public string ID { get; set; }
    }
}