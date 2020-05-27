namespace DataEnteringQuality.Models
{
    public class EnteringResultModel
    {
        public int NumOfTest { get; set; }
        public int NumOfWords { get; set; }
        public string CPS { get; set; }
        public string WPM { get; set; }
        public string MistakeProbability { get; set; }
        public int[] TypingTime { get; set; }
    }
}