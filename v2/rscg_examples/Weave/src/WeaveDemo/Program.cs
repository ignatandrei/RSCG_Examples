using WeaveDemo;

Person p = new()
{
FirstName = "Andrei", LastName = "Ignat" 
};


MyProject.Templates.RenderFizzBuzz(p, Console.Out);

StringWriter sw = new();
MyProject.Templates.RenderFizzBuzz(p, sw);
Console.WriteLine("---------------------------");
Console.WriteLine(sw.ToString());

