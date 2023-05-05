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