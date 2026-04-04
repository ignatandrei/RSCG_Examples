using Najlot.Audit;
using Najlot.Audit.Attributes;

namespace AuditDemo;

[AuditProvider]
public partial class Person
{
    public string FirstName { get; set; }= string.Empty;
    public string LastName { get; set; }= string.Empty;
    public string FullName() => $"{FirstName} {LastName}";

    public int Id { get; set; }
}


[AuditProvider]
public partial class PersonAuditProvider
{
    [AuditIgnore(nameof(Person.Id))]
    public static partial IEnumerable<PropertyValue> GetPropertyValues(Person entity);
}