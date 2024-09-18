// See https://aka.ms/new-console-template for more information
using GetTypesForInterface;

Console.WriteLine("Hello, World!");
foreach (var type in ProjectTypes.GetIPersonTypes())
{
    Console.WriteLine(type.Name);
}