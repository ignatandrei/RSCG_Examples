using AOPMethodsCommon;
using System;
using System.Diagnostics;
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

        //private Task prvDelay(int minValue)
        //{

        //    var waitMin = Task.Delay(Math.Abs(minValue));
        //    return waitMin;
        //}
        //private Task prvDelayFix()
        //{

        //    return prvDelay(1000);
        //}

    }
    class Program
    {
        static async Task Main(string[] args)
        {
            var p = new Person();
            p.FirstName = "Andrei";
            p.LastName = "Ignat";
            Console.WriteLine(p.FullName());
            //await Task.WhenAll( p.DelayFix(),p.Delay(5000));
        }
    }
}
