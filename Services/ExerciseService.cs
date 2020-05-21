using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using Aspose.Cells.Utility;
using DataEnteringQuality.Entities;
using DataEnteringQuality.Models;
using DataEnteringQuality.Models.JsonModels;
using GemBox.Spreadsheet;
using Newtonsoft.Json;

namespace DataEnteringQuality.Services
{
    public class ExerciseService : IExerciseService
    {
        public async Task SaveSlideringTestResult(SlideringResultModel result, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_PRZECIAGANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[0];

            var valuesAccuracy = new List<SlideringValuesAccuracyJsonModel>();
            for (int i = 0; i < result.ValuesAccuracy.Length; i++)
            {
                string valueFromTest;
                string accuracy;
                if (result.ValuesFromTest[i] == 0)
                {
                    valueFromTest = "WARTOŚĆ NIEUSTAWIONA";
                    accuracy = "WARTOŚĆ NIEUSTAWIONA";
                }
                else
                {
                    valueFromTest = result.ValuesFromTest[i].ToString();
                    accuracy = result.ValuesAccuracy[i].ToString();
                }

                valuesAccuracy.Add(new SlideringValuesAccuracyJsonModel()
                {
                    ValueToSet = result.ValuesToSet[i],
                    ValueFromTest = valueFromTest,
                    Accuracy = accuracy
                });
            }

            var fullResult = new SlideringFullResultJsonModel()
            {
                NumOfMistakes = result.NumOfMistakes,
                ValuesAccuracy = valuesAccuracy
            };

            var results = new List<SlideringFullResultJsonModel>();
            results.Add(fullResult);

            var jsonResult = new SlideringResultJsonModel()
            {
                NumOfTest = result.NumOfTest,
                Results = results
            };

            string jsonResultString = JsonConvert.SerializeObject(jsonResult);

            CellsFactory factory = new CellsFactory();
            var style = factory.CreateStyle();
            style.HorizontalAlignment = TextAlignmentType.Center;
            style.Font.Color = System.Drawing.Color.Black;
            style.Font.IsBold = true;

            JsonLayoutOptions options = new JsonLayoutOptions();
            options.TitleStyle = style;
            options.ArrayAsTable = true;

            int row = worksheet.Cells.MaxDataRow;
            if (row == -1)
            {
                row = 0;
            }
            else
            {
                row += 2;
            }

            JsonUtility.ImportData(jsonResultString, worksheet.Cells, row, 0, options);

            await Task.Run(() => workbook.Save(dirPath + resultsPath));

            SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

            var excelFile = ExcelFile.Load(dirPath + resultsPath);
            excelFile.Worksheets.Remove(2);
            await Task.Run(() => excelFile.Save(dirPath + resultsPath));
        }

        public async Task SaveSlideringTestSettings(SlideringSettingsModel settings, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_PRZECIAGANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[1];

            var jsonSettings = new SlideringSettingsJsonModel()
            {
                NumOfTest = settings.NumOfTest,
                Params = new SlideringParamsJsonModel()
                {
                    NumOfAttempts = settings.NumOfAttempts,
                    ValuesRange = "<" + settings.NumbersFrom + "," + settings.NumbersTo + ">",
                    Time = settings.Time + "s"
                }
            };

            string jsonSettingsString = JsonConvert.SerializeObject(jsonSettings);

            CellsFactory factory = new CellsFactory();
            var style = factory.CreateStyle();
            style.HorizontalAlignment = TextAlignmentType.Center;
            style.Font.Color = System.Drawing.Color.Black;
            style.Font.IsBold = true;

            JsonLayoutOptions options = new JsonLayoutOptions();
            options.TitleStyle = style;
            options.ArrayAsTable = true;

            int row = worksheet.Cells.MaxDataRow;
            if (row == -1)
            {
                row = 0;
            }
            else
            {
                row += 2;
            }

            JsonUtility.ImportData(jsonSettingsString, worksheet.Cells, row, 0, options);

            await Task.Run(() => workbook.Save(dirPath + resultsPath));

            SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

            var excelFile = ExcelFile.Load(dirPath + resultsPath);
            excelFile.Worksheets.Remove(2);
            await Task.Run(() => excelFile.Save(dirPath + resultsPath));
        }
    }
}