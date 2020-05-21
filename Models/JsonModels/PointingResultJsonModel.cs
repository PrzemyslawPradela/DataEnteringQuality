using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingResultJsonModel
    {
        [JsonProperty("NR TESTU")]
        public int NumOfTest { get; set; }

        [JsonProperty("WYNIKI")]
        public List<PointingFullResultJsonModel> Results { get; set; }
    }
}