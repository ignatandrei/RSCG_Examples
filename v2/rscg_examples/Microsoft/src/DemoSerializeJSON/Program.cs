﻿using JsonSerializerOptionsExample;
using System.Text.Json;
//for asp.net core
//services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.AddContext<MyJsonContext>());
//https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/raw-string

string jsonString ="""
{
  "date": "2019-08-01T00:00:00",
  "temperatureCelsius": 25,
  "summary": "Hot"
}
""";
        WeatherForecast? weatherForecast= JsonSerializer.Deserialize(
            jsonString,
            typeof(WeatherForecast),
            new OptionsExampleContext(
                new JsonSerializerOptions(JsonSerializerDefaults.Web)))
                as WeatherForecast;
        Console.WriteLine($"Date={weatherForecast?.Date}");
        // output:
        //Date=8/1/2019 12:00:00 AM

        jsonString = JsonSerializer.Serialize(
            weatherForecast,
            typeof(WeatherForecast),
            new OptionsExampleContext(
                new JsonSerializerOptions(JsonSerializerDefaults.Web)));
        Console.WriteLine(jsonString);
jsonString = JsonSerializer.Serialize(
    weatherForecast,
    typeof(WeatherForecast),
    new OptionsExampleContext(
        new JsonSerializerOptions(JsonSerializerDefaults.General)));
Console.WriteLine(jsonString);
// output:
//{ "date":"2019-08-01T00:00:00","temperatureCelsius":25,"summary":"Hot"}
