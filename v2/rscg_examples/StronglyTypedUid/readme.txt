# StronglyTypedUid
C# Implementation of Strongly Typed Id made easy.

StronglyTypedUid [![NuGet Badge](https://buildstats.info/nuget/StronglyTypedUid)](https://www.nuget.org/packages/StronglyTypedUid/)

StronglyTypedUid.Generator [![NuGet Badge](https://buildstats.info/nuget/StronglyTypedUid.Generator)](https://www.nuget.org/packages/StronglyTypedUid.Generator/)

[![publish to nuget](https://github.com/vicosanz/StronglyTypedUid/actions/workflows/main.yml/badge.svg)](https://github.com/vicosanz/StronglyTypedUid/actions/workflows/main.yml)


## Buy me a coffee
If you want to reward my effort, :coffee: https://www.paypal.com/paypalme/vicosanzdev?locale.x=es_XC


All strongly typed ids are source generated, you must create a record struct in this ways:

Using attribute decorating a record struct (default Guid version)

```csharp
    [StronglyTypedUid] 
    public readonly partial record struct CustomerId { }
```

If you want change to Ulid

```csharp
    [StronglyTypedUid(asUlid:true)] 
    public readonly partial record struct CustomerId { }
```

Create additional converters to popular packages like efcore, dapper and newtonsoftjson

```csharp
    [StronglyTypedUid(asUlid:true, [EnumAdditionalConverters.EFCore, EnumAdditionalConverters.Dapper, EnumAdditionalConverters.NewtonsoftJson])]
    public readonly partial record struct CustomerId { }
```

The generator will create a partial record struct of the same name

```csharp
// Auto generated code
[TypeConverter(typeof(CustomerIdTypeConverter))]
[System.Text.Json.Serialization.JsonConverter(typeof(CustomerIdJsonConverter))]
public readonly partial record struct CustomerId(Guid Value) : IStronglyTypedGuid
{
    public static CustomerId Empty => new(Guid.Empty);

    public static CustomerId NewCustomerId() => new(Guid.NewGuid());

    public static implicit operator CustomerId(Guid value) => new(value);

    public static explicit operator Guid(CustomerId value) => value.Value;

    public bool IsEmpty => Value == Guid.Empty;

    public override string ToString() => Value.ToString();

    public static CustomerId Parse(string text) => new CustomerId(Guid.Parse(text));

    public static bool TryParse(string text, out CustomerId result)
    {
        try
        {
            if (Guid.TryParse(text, out Guid uid))
            {
                result = uid;
                return true;
            }
        }
        catch (Exception)
        {
        }
        result = default;
        return false;
    }
}
```

You can add additional logic to your strongly type id.

```csharp
    [StronglyTypedUid] 
    public readonly partial record struct CustomerId 
    { 
        public override string ToTaggedString() => $"CID-{Value}";

        public static bool TryParseTagged(string text, out CustomerId customer)
        {
		    try
		    {
                if (Guid.TryParse(text[4..], out Guid result))
                {
                    customer = result;
                    return true;
                }
            }
            catch (Exception)
		    {
		    }
            customer = default;
            return false;
        }
    }
```

The new type is decorated with a TypeConverter and a JsonConverter automatically

```csharp
[TypeConverter(typeof(CustomerIdTypeConverter))]
[System.Text.Json.Serialization.JsonConverter(typeof(CustomerIdJsonConverter))]
```

You can serialize and deserialize without problems


```csharp
public record Customer(CustomerId Id, string Name);


var newcustomer = new Customer(CustomerId.NewCustomerId(), "Jhon");

var serializeOptions = new JsonSerializerOptions
{
    WriteIndented = true
};
var json = JsonSerializer.Serialize(newcustomer, serializeOptions);

var newcustomer2 = JsonSerializer.Deserialize<Customer>(json);

```
