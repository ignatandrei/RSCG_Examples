
using FactoryGenerator.Abstractions;

namespace InjectDemo;
public enum PersonType
{
    Employee,
    Customer
}
[GenerateIFactory<PersonType>]
public class PersonFactory
{
    private readonly PersonType person;

    public PersonFactory(PersonType person)
    {
        this.person = person;
    }
    public Person Create()
    {
        return person switch
        {
            PersonType.Employee => new Employee()
            {
                TypeName = nameof(Employee)
            },
            PersonType.Customer => new Customer()
            {
                TypeName = nameof(Customer)
            },
            _ => throw new NotImplementedException()
        };
    }
}

public class Person
{
    public string Name { get; set; } = string.Empty;
    public string TypeName { get;init; } = string.Empty;
}

public class Employee : Person
{
}
public class Customer : Person
{
}

