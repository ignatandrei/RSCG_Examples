using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RSCG_DemoObjects;
public class PersonLoader : IPersonLoader
{
    public static void Connect()
    {
        Console.WriteLine("connected");
    }
    public static async Task<Person> SavePerson(Person p)
    {
        await Task.Delay(100);
        return p;
    }
    public Task<Person> InsertPerson(Person p)
    {
        return Task.FromResult(p);
    }
}
