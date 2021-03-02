using AOPMethodsCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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
        static void Main(string[] args)
        {
            var s = Metadata_Person.expr_FirstName_Contains("asd");
            var p = new PersonList();
            var q = p.Where(s.Compile());
        }
    }
}
