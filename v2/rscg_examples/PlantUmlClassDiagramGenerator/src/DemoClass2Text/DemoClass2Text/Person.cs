
namespace DemoClass2Text
{
    [PlantUmlClassDiagramGenerator.SourceGenerator.Attributes.PlantUmlDiagram]
    internal class Person
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName() => $"{FirstName} {LastName}";
    }
}