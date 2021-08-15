using DuckingBL;
using DuckingInterfaces;
using System;

namespace DucKing
{
    
    class Program
    {
        static void Main(string[] args)
        {
            var p = new Person();
            p.Name = "Andrei Ignat";
            WritePerson(p);
        }
        static void WritePerson(IPerson person)
        {
            Console.WriteLine(person.Name);
        }
    }
}
