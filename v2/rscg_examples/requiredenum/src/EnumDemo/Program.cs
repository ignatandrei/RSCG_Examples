// See https://aka.ms/new-console-template for more information
using EnumDemo;

Console.WriteLine("Hello, World!");
RequiredCarTypes myCar = RequiredCarTypes.Tesla;
switch(myCar)
{
    //comment any case to see the error in action
    case RequiredCarTypes.None:
        Console.WriteLine("No car");
        break;
    case RequiredCarTypes.Dacia:
        Console.WriteLine("Dacia");
        break;
    case RequiredCarTypes.Tesla:
        Console.WriteLine("Tesla");
        break;
    case RequiredCarTypes.BMW:
        Console.WriteLine("BMW");
        break;
    case RequiredCarTypes.Mercedes:
        Console.WriteLine("Mercedes");
        break;
    default:
        Console.WriteLine("Unknown car");
        break;
}