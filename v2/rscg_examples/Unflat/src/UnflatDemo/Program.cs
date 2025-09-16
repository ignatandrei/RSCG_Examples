using System;
using System.Data;
using Unflat;

namespace UnflatDemo
{

    class Program
    {
        static void Main(string[] args)
        {
            // Create a DataTable and fill with sample data
            var table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Age", typeof(int));

            table.Rows.Add(1, "Andrei", 30);
            table.Rows.Add(2, "Ignat", 55);

            using var reader = table.CreateDataReader();

            var persons = PersonParser.ReadList(reader);
            foreach (var person in persons)
            {
                Console.WriteLine($"Id: {person.Id}, Name: {person.Name}, Age: {person.Age}");
            }
        }
    }
}
