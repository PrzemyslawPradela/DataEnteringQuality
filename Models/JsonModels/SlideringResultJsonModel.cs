using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class SlideringResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("WYNIKI")]
        public List<SlideringFullResultJsonModel> Results { get; set; }
    }
}