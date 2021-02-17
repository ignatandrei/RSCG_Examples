using System;
using JsonToClass.Json.Person;
using Microsoft.Extensions.Configuration;

namespace JsonToClass
{
    class Program
    {
        static void Main(string[] args)
        {
            var p1 = new Person();
            p1.Blog = "http://msprogrammer.serviciipeweb.ro/";
            var config = new ConfigurationBuilder()
              .AddJsonFile("person.json")
              .Build();

            var p = config.Get<Person>();
            Console.WriteLine($"{p.FirstName}");
        }
    }
}
