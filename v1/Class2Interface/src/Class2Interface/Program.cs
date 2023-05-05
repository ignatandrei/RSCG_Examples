using BoilerplateFree;
using System;
using System.Diagnostics;

namespace Class2Interface
{
    class Program
    {
        static void Main(string[] args)
        {
            IPerson p = new Person();
            p.Name = "Andrei";
            p.Foo();
            Console.WriteLine(p.Name);
        }
    }

    [AutoGenerateInterface]
    public partial class Person: IPerson
    {
        public void Foo()
        {
            Console.WriteLine("Foo");
        }
        //dummy
        private string s { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        //dummy
        public static string NewID { get; set; }
    }
}
