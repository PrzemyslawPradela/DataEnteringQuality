namespace DataEnteringQuality.Models
{
    public class PointingResultModel
    {
        public int NumOfTest { get; set; }
        public int[] BtnWidth { get; set; }
        public int[] BtnDistance { get; set; }
        public int AttemptsLeft { get; set; }
        public int NumOfMissClick { get; set; }
        public string[] IDs { get; set; }
    }
}