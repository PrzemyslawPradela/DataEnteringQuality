namespace DataEnteringQuality.Models
{
    public class EnteringResultModel
    {
        public int NumOfTest { get; set; }
        public int NumOfWords { get; set; }
        public double AverageNumOfMistakesInWords { get; set; }
        public int NumOfMistypedWords { get; set; }
        public bool AllWordsEmpty { get; set; }
        public int NumOfEnteredWords { get; set; }
    }
}