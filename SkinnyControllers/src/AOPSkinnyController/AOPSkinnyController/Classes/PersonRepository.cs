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
        public async Task<Person> Get(int id)
        {
            await Task.Delay(1000);
            return new Person()
            {
                ID = id,
                Name = "Andrei " + id
            };
        }

        //add more functions here to make the demo
    }
    
}
