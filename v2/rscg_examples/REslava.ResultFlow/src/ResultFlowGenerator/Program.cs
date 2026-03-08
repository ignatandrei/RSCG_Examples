// See https://aka.ms/new-console-template for more information
using ResultFlowGenerator;
Console.WriteLine("The mermaid is working!");
Console.WriteLine(Generated.ResultFlow.Helpers_Flows.GetValueFromConsole);
Console.WriteLine("Please enter an int");
var result = Helpers.GetValueFromConsole();
Console.WriteLine(result.IsSuccess
    ? $"You entered: {result.Value}"
    : $"Failed to get a valid integer: {result.Errors.First().Message}");
