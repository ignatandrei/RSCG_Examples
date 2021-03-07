[DataContract(Name = "Person", Namespace = "JsonToClass.Json.Persons")]
public partial class Person
{
[DataMember(Name = "FirstName", EmitDefaultValue = false, Order = 0)]
public string FirstName { get; set; }
[DataMember(Name = "LastName", EmitDefaultValue = false, Order = 1)]
public string LastName { get; set; }
[DataMember(Name = "Blog", EmitDefaultValue = false, Order = 2)]
public string Blog { get; set; }

public static Person FromConfig([System.Diagnostics.CodeAnalysis.NotNull] IConfiguration config)
{
return config.Get<Person>();
}
}