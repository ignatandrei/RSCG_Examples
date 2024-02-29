using System.Text.Json;
var testData = JsonSerializer.Deserialize<JSON2ClassConsole.SettingsJson.testData>(System.IO.File.ReadAllText("testData.json"));
ArgumentNullException.ThrowIfNull(testData);
Console.WriteLine(testData.Logging.LogLevel.Default);
Console.WriteLine(testData.DictData.Number_2);