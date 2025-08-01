using SimpleFluentExample;

Console.WriteLine("Example Basic calculation state machine");
var result1 = CalculatorService.Create()
    .Add(10)
    .Subtract(3)
    .Add(5)
    .Calculate();

Console.WriteLine($"Result 1: {result1}"); // Output: 12
Console.WriteLine();

// Uncomment these lines to see compilation errors:
// CalculatorService.Create().Calculate();        // Can't calculate without operations  
// CalculatorService.Create().Add(5).Add(10);     // Missing Calculate() at the end
