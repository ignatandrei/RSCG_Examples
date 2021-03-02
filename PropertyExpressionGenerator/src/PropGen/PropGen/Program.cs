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

        public static Expression<Func<Person, bool>> expr_LastName_Contains(string[] value) => (it => value.Contains(it.LastName));



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

            

            var queryCnt = Metadata_Person.expr_FirstName_Contains("9");
            var pers= await cnt.Person.Where(queryCnt).ToArrayAsync();
            Console.WriteLine(pers.Length);


            queryCnt = Metadata_Person.expr_LastName_NullOrWhite();
            pers = await cnt.Person.Where(queryCnt).ToArrayAsync();
            Console.WriteLine(pers.Length);


            var queryID = Metadata_Person.expr_ID_Equal(7);
            var pId = await cnt.Person.FirstOrDefaultAsync(queryID);
            Console.WriteLine(pId.FirstName);


            queryID = Metadata_Person.expr_ID_Contains(7,9);
            pers = await cnt.Person.Where(queryID).ToArrayAsync();
            Console.WriteLine(pers.Length);


            var nullBirthDateQuery = Metadata_Person.expr_DateOfBirth_Null();
            var birthNull = await cnt.Person.Where(nullBirthDateQuery).ToArrayAsync();
            Console.WriteLine(birthNull.Length);
            
            var query = Metadata_Person.FindEx("ID", SearchCriteria.Equal, 99);
            pers = await cnt.Person.Where(query).ToArrayAsync();
            Console.WriteLine(pers.Length);

            query = Metadata_Person.FindEx("DateOfBirth", SearchCriteria.FindNull);
            pers = await cnt.Person.Where(query).ToArrayAsync();
            Console.WriteLine(pers.Length);

        }
    }
}
