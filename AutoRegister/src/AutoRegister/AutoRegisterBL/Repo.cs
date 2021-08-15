using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace AutoRegisterBL
{
    [Inject(ServiceLifetime.Transient)]
    public class Repo
    {
        public async Task<Person> GetFromId(int id)
        {
            await Task.Delay(1000);
            return new Person()
            {
                ID = id,
                Name = "Andrei Ignat " + id
            };
        }
    }
}
