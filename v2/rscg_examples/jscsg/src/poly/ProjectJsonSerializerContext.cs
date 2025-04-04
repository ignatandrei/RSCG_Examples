﻿//https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/polymorphism?pivots=dotnet-7-0
using JsonPolymorphicGeneratorDemo;
using System.Text.Json.Serialization;

[JsonSourceGenerationOptions(
    WriteIndented = true,
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    GenerationMode = JsonSourceGenerationMode.Default
)]
[JsonSerializable(typeof(Person[]))]
[JsonSerializable(typeof(Person))]
[JsonSerializable(typeof(Student))]
[JsonSerializable(typeof(Teacher))]
public partial class ProjectJsonSerializerContext : JsonSerializerContext
{
    static ProjectJsonSerializerContext()
    {
        foreach (var converter in GetPolymorphicConverters())
        {
            s_defaultOptions.Converters.Add(converter);
        }
    }
}