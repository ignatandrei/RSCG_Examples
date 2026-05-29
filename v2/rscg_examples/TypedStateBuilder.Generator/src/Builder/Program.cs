using Builder;
using TypedStateBuilder;
Console.WriteLine("create person builder");

var p = TypedStateBuilders
    .CreatePersonBuilder()
    .SetFirstName("Andrei")
    .SetLastName("Ignat")
    .Build()
    ;
;

Console.WriteLine(p.FullName());
