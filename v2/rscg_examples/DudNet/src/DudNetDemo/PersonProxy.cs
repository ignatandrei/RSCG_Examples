namespace DudNetDemo;

public partial class PersonProxy
{
    public PersonProxy(IPerson person)
    {
        this._service = person;
    }
    partial void Interceptor(string callerName = null)
    {
        Console.WriteLine($"{callerName} was called");
    }
    partial void set_FirstNameInterceptor(string? value)
    {
        Console.WriteLine("set_FirstName was called with value " + value);

    }
}