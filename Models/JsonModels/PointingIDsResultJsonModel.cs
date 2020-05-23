using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingIDsResultJsonModel
    {
        [JsonProperty("WSKAŹNIK TRUDNOŚCI")]
        public List<PointingIDJsonModel> IDs { get; set; }
    }
}