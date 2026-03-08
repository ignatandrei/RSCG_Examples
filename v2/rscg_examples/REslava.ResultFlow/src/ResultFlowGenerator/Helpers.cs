using REslava.Result;
using REslava.Result.AdvancedPatterns;
using REslava.Result.Extensions;
using System;
using System.Collections.Generic;

namespace ResultFlowGenerator;

internal class Helpers
{
    [REslava.ResultFlow.ResultFlow]
    public static Result<int> GetValueFromConsole()
    {
        var value = Console.ReadLine() ?? "";
        return Result<string>.Ok(value)
            .Ensure(s => !string.IsNullOrWhiteSpace(s), new Error("Input cannot be empty"))
            .Map(s => s.ToUpper())
            .Tap(s => Console.WriteLine($"Processed: {s}"))
            .TapOnFailure(e => Console.WriteLine($"Error: {e.Message}"))
            .Ensure(s => int.TryParse(s, out _), new Error("Input must be a valid integer"))
            .Map(s => int.Parse(s))
            ;


    }
}
