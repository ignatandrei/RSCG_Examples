var fromInt = enumMathematicalOperation.ParseExactMathematicalOperation(1);
var fromString = enumMathematicalOperation.ParseExactMathematicalOperation("add");
Console.WriteLine(fromInt + "-"+fromString);