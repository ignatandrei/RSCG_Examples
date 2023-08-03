namespace FastGenericNewDemo;

class Person
{
    private Person()
    {
        FirstName = "Andrei";
    }
    public Person(string firstName)
    {
        this.FirstName=firstName;
    }
    public string FirstName { get; set; }
}
