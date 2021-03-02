using AOPMethodsCommon;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PropGen
{

    [AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "CreateMetadata.txt")]
    public partial class Person
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime? DateOfBirth {get;set;}

    }
        public class PersonList : List<Person>
    {
        public Expression<Func<Person,bool>> FindEx(string nameProp, SearchCriteria s, object value)
        {
            return null;
        }
    }
    class Program
    {
        static async Task Main(string[] args)
        {
            var sc = new ServiceCollection();
            sc.AddDbContext<DatabaseContext>(opt =>
            {
                opt.UseInMemoryDatabase("myMemory");
            });

            var diContainer = sc.BuildServiceProvider();
            var cnt = diContainer.GetService<DatabaseContext>();
            for (int i = 1; i < 100 ; i++)
            {
                var p = new Person();
                p.ID = 0;
                p.FirstName = "Andrei "+i;
                p.LastName = (i % 2 == 0) ? "" : "Ignat" + i;
                p.DateOfBirth = (i % 2 == 0) ? null : new DateTime(1970, 4, 16);
                cnt.Person.Add(p);
            }
            await cnt.SaveChangesAsync();
            var s = Metadata_Person.expr_FirstName_Contains("asd");

            var queryCnt = Metadata_Person.expr_FirstName_Contains("9");
            var p9 = await cnt.Person.Where(queryCnt).ToArrayAsync();
            Console.WriteLine(p9.Length);
            var queryID = Metadata_Person.expr_ID_equal(7);
            var pId = await cnt.Person.FirstOrDefaultAsync(queryID);
            Console.WriteLine(pId.FirstName);
            //var p = new PersonList();
            //var q = p.Where(s.Compile());
        }
    }
}
