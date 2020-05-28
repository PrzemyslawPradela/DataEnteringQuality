using System;
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
        private static readonly Random random = new Random();
        private static readonly object syncLock = new object();

        public async Task<byte[]> DownloadEnteringTestResult(Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WPROWADZANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";
            byte[] fileBytes = File.ReadAllBytes(dirPath + resultsPath);
            return await Task.Run(() => fileBytes);
        }

        public async Task SaveEnteringTestResult(EnteringResultModel result, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WPROWADZANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[0];

            var typingTime = new List<EnteringTypingTimeJsonModel>();
            foreach (var item in result.TypingTime)
            {
                typingTime.Add(new EnteringTypingTimeJsonModel()
                {
                    TypingTime = item
                });
            }

            var jsonResult = new EnteringResultJsonModel()
            {
                NumOfTest = result.NumOfTest,
                CPS = result.CPS,
                WPM = result.WPM,
                MistakeProbability = result.MistakeProbability,
            };

            string jsonResultString = JsonConvert.SerializeObject(jsonResult);
            string jsonTypingTime = JsonConvert.SerializeObject(typingTime);

            Console.Write(jsonTypingTime);

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
            JsonUtility.ImportData(jsonTypingTime, worksheet.Cells, row, 4, options);

            await Task.Run(() => workbook.Save(dirPath + resultsPath));

            SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

            var excelFile = ExcelFile.Load(dirPath + resultsPath);
            excelFile.Worksheets.Remove(2);
            await Task.Run(() => excelFile.Save(dirPath + resultsPath));
        }

        public async Task<string[]> SaveEnteringTestSettings(EnteringSettingsModel settings, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WPROWADZANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[1];

            var jsonSettings = new EnteringSettingsJsonModel()
            {
                NumOfTest = settings.NumOfTest,
                NumOfWords = settings.NumOfWords,
                Time = settings.Time,
                WordLength = settings.WordLength
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

            string[] words = new string[settings.NumOfWords];

            for (int i = 0; i < settings.NumOfWords; i++)
            {
                words[i] = RandomWord(settings.WordLength);
            }

            return await Task.Run(() => words);
        }

        public async Task<byte[]> DownloadPointingTestResult(Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WSKAZYWANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";
            byte[] fileBytes = File.ReadAllBytes(dirPath + resultsPath);
            return await Task.Run(() => fileBytes);
        }

        public async Task SavePointingTestResult(PointingResultModel result, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WSKAZYWANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[0];

            var ids = new List<PointingIDJsonModel>();
            for (int i = 0; i < result.IDs.Length; i++)
            {
                ids.Add(new PointingIDJsonModel()
                {
                    BtnWidth = result.BtnWidth[i].ToString() + "px",
                    BtnDistance = result.BtnDistance[i].ToString() + "px",
                    ID = result.IDs[i]
                });
            }

            var fullResult = new PointingFullResultJsonModel()
            {
                Mistakes = new PointingMistakesJsonModel()
                {
                    AttemptsLeft = result.AttemptsLeft,
                    NumOfMissClick = result.NumOfMissClick
                },
                ID = new PointingIDsResultJsonModel()
                {
                    IDs = ids
                }
            };

            var results = new List<PointingFullResultJsonModel>();
            results.Add(fullResult);

            var jsonResult = new PointingResultJsonModel()
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

        public async Task SavePointingTestSettings(PointingSettingsModel settings, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_WSKAZYWANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[1];

            var jsonSettings = new PointingSettingsJsonModel()
            {
                NumOfTest = settings.NumOfTest,
                D = settings.D,
                W = settings.D,
                NumOfAttempts = settings.NumOfAttempts,
                Time = settings.Time
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

        public async Task<byte[]> DownloadSlideringTestResult(Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_PRZECIAGANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";
            byte[] fileBytes = File.ReadAllBytes(dirPath + resultsPath);
            return await Task.Run(() => fileBytes);
        }

        public async Task SaveSlideringTestResult(SlideringResultModel result, Student student)
        {
            string dirPath = "." + Path.DirectorySeparatorChar + "WYNIKI" + Path.DirectorySeparatorChar + student.Class + Path.DirectorySeparatorChar;
            string resultsPath = "TEST_PRZECIAGANIA" + Path.DirectorySeparatorChar + student.Surname + "_" + student.StudentNumber + ".xlsx";

            Workbook workbook = new Workbook(dirPath + resultsPath);
            Worksheet worksheet = workbook.Worksheets[0];

            var valuesAccuracy = new List<SlideringValuesAccuracyJsonModel>();
            for (int i = 0; i < result.NumOfAttempts; i++)
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

        private string RandomWord(int wordLength)
        {
            string path = "." + Path.DirectorySeparatorChar + "slownik" + Path.DirectorySeparatorChar + "slowa_" + wordLength + ".txt";
            var lines = File.ReadAllLines(path);
            var randomLineNumber = RandomNumber(0, lines.Length - 1);
            return lines[randomLineNumber];
        }

        private static int RandomNumber(int min, int max)
        {
            lock (syncLock)
            {
                return random.Next(min, max);
            }
        }
    }
}