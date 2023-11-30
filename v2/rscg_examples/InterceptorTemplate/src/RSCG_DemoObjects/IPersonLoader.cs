
namespace RSCG_DemoObjects;

public interface IPersonLoader
{
    Task<Person> InsertPerson(Person p);
}