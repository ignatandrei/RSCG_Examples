using Apparatus.AOT.Reflection;
using System;

namespace CopyConstructor
{
    class Program
    {
        static void Main(string[] args)
        {
            var pOldPerson = new Person();
            var prop = pOldPerson.GetProperties().Values ;
            foreach (var item in prop)
            {
                Console.WriteLine($"{item.Name} Attr: {item.Attributes.Length}");
            }            
        }
    }
}
