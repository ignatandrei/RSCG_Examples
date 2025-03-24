using BunnyTail.MemberAccessor;
using DemoMember;

var accessorFactory = AccessorRegistry.FindFactory<Person>();
ArgumentNullException.ThrowIfNull(accessorFactory);
var getter = accessorFactory.CreateGetter<string>(nameof(Person.FirstName));
var setter = accessorFactory.CreateSetter<string>(nameof(Person.FirstName));
ArgumentNullException.ThrowIfNull(getter);
ArgumentNullException.ThrowIfNull(setter);
var p= new Person();
setter(p, "andrei");
Console.WriteLine(getter(p));