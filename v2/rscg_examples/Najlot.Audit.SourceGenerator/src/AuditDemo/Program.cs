using AuditDemo;
using Najlot.Audit;

Person p = new() { Id = 1, FirstName = "John", LastName = "Doe" };

var audit = new Audit();
audit.RegisterProvider<PersonAuditProvider>();
var snapshot = audit.CreateSnapshot(p);

p.LastName = "Ignat";
p.FirstName = "Andrei";
var changes= snapshot.GetChanges().ToArray();
foreach (var change in changes)
{
    Console.WriteLine($"Property: {change.Path}, Old Value: {change.OldValue}, New Value: {change.NewValue}");
}