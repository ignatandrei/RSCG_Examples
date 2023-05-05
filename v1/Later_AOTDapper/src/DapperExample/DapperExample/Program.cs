using DapperExampleDAL;
using Microsoft.Data.Sqlite;
using System;

namespace DapperExample
{
    class Program
    {
        static void Main(string[] args)
        {
            using(var cn =new SqliteConnection("Data Source=MY.db"))
            {
                var all = DapperDAL.GetAll(cn);
                //foreach(var item in all)
                //{
                //    Console.WriteLine(item.id);
                //}
            }

        }
    }
}
