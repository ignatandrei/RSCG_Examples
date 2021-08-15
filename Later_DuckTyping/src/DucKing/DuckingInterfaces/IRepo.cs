using System.Threading.Tasks;

namespace DuckingInterfaces
{
    public interface IRepo
    {
        public Task<IPerson> GetThePersonFromId(int id);
        
    }
}
