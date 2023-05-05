using System;

namespace CopyConstructor
{
    class Program
    {
        static void Main(string[] args)
        {
            var pOldPerson = new Person();
            pOldPerson.FirstName = "Andrei";
            pOldPerson.LastName = "Ignat";
            var newPerson = new Person(pOldPerson);
            Console.WriteLine(newPerson.FirstName);
            var (_, last) = newPerson;
            Console.WriteLine(last);
        }
    }
}
