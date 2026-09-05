using EnumDemo;

CarTypes dacia1 = CarTypes.Dacia;
var dacia2 = CarTypes.FromName("Dacia");
Console.WriteLine($"CarTypes {CarTypes.Count}: {dacia1} {dacia2} ");
