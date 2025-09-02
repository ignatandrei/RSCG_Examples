<h1 align="center">RequiredEnum</h1>

RequiredEnum is an open-source analyzer that helps handle all enum values for switch.

# Installation

[NuGet](https://www.nuget.org/packages/RequiredEnum/): `dotnet add package requiredenum`

# Usage

Just add 'Required' prefix for any name of enum in your project and you will get the error when one of cases weren't handle in a switch statement.

```csharp
var test = (RequiredNumbers) Random.Shared.Next(0, Enum.GetNames(typeof(RequiredNumbers)).Length);
switch (test)
{
    case RequiredNumbers.Zero:
        break;
    case RequiredNumbers.One:
        break;
    default:
        throw new ArgumentOutOfRangeException();
}

internal enum RequiredNumbers
{
    Zero,
    One,
    Two
}
```
This code will throw the error ('Two' case wasn't handle) and it can't be compiled.

# License

RequiredEnum distributed under [MIT](./LICENSE) license.
