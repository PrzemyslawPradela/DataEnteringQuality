using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class EnteringResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("WYNIKI")]
        public List<EnteringFullResultJsonModel> Results { get; set; }
    }
}