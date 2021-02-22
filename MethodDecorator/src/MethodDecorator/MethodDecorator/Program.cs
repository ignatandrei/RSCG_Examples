using AOPMethodsCommon;
using System;
using System.Threading.Tasks;

namespace MethodDecorator
{
    [AutoMethods(template =TemplateMethod.CustomTemplateFile,MethodPrefix ="prv" ,CustomTemplateFileName ="MethodDecorator.txt")]
    public partial class Person
    {
        public string FirstName{ get; set; }
        public string LastName { get; set; }

        private string prvFullName()
        {
            return FirstName + " " + LastName;
        }

        private Task prvDelay(int minValue)
        {

            var waitMin = Task.Delay(Math.Abs(minValue));
            return waitMin;
        }

    }
    class Program
    {
        static async Task Main(string[] args)
        {
            var p = new Person();
            p.FirstName = "Andrei";
            p.LastName = "Ignat";
            Console.WriteLine(p.FullName());
            Console.ReadKey();
            await Task.WhenAll( p.Delay(10000),p.Delay(5000));
        }
    }
}
