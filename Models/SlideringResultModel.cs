namespace DataEnteringQuality.Models
{
    public class SlideringResultModel
    {
        public int NumOfTest { get; set; }
        public int NumOfAttempts { get; set; }
        public int NumOfMistakes { get; set; }
        public int[] Bb { get; set; }
        public string[] Bw { get; set; }
        public string Tm { get; set; }
        public int[] ValuesToSet { get; set; }
        public int[] ValuesFromTest { get; set; }
    }
}