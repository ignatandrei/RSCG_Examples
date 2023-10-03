namespace GedaqDemoConsole.Model
{
    public class Person
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public Address Address { get; set; }
    }
}