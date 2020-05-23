using System.Collections.Generic;
using Newtonsoft.Json;

namespace DataEnteringQuality.Models.JsonModels
{
    public class PointingFullResultJsonModel
    {
        public PointingMistakesJsonModel Mistakes { get; set; }
        public PointingIDsResultJsonModel ID { get; set; }
    }
}