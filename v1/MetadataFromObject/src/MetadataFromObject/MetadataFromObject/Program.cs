using AOPMethodsCommon;
using System;

namespace MetadataFromObject
{
    [AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "GenerateFromPOCO.txt")]
    public partial class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var p = new Person();
            p.FirstName = "Andrei";
            p.LastName = "Ignat";
            var last = p.ValueProperty(Person_EnumProps.LastName);
            var first = p.ValueProperty("FirstName");
            
            Console.WriteLine(last + " "+first);
        }
    }
}
