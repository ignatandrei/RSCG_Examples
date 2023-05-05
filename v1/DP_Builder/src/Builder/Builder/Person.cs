using DasMulli.DataBuilderGenerator;

namespace Builder
{
    [GenerateDataBuilder]
    public class Person
    {
        public string FirstName { get; set; }
        public string? MiddleNames { get; set; }
        public string LastName { get; set; }

        
    }
}
