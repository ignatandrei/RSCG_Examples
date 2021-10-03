using System;

namespace ToStringDebugger
{
    class Program
    {
        static void Main(string[] args)
        {
            var p = new Person();
            p.FirstName = "Andrei";
            //put here a debug watch to see p
            Console.WriteLine(p.ToString());
        }
    }

    [StructGenerators.GenerateToString(PrintTypeName = true)]
    public partial class Person
    {
        public void Foo()
        {
            Console.WriteLine("Foo");
        }
        //dummy
        private string s { get; set; }
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //dummy
        public static string NewID { get; set; }
    }
}
