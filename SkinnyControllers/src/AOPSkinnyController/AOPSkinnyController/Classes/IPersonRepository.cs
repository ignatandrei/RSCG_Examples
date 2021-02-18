using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AOPSkinnyController.Classes
{
    public class Person {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    public class PersonRepository
    {
        public Person Get(int id)
        {
            return new Person()
            {

            }
        }
    }
    public class IPersonRepository
    {
    }
}
