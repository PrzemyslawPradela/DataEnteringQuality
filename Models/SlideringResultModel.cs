namespace DataEnteringQuality.Models
{
    public class SlideringResultModel
    {
        public int NumOfTest { get; set; }
        public int NumOfMistakes { get; set; }
        public int[] ValuesAccuracy { get; set; }
        public int[] ValuesToSet { get; set; }
        public int[] ValuesFromTest { get; set; }
    }
}