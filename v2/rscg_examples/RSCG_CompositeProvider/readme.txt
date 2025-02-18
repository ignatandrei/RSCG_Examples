# RSCG_CompositeProvider


Composite provider from interface . Given multiple implementation of an interface , return data from each / one 


## Usage

Add the nuget package to your project

```
dotnet add package RSCG_CompositeProvider
dotnet add package RSCG_CompositeProviderCommon
```

or put in your csproj file
```xml
  <ItemGroup>
    <PackageReference Include="RSCG_CompositeProvider" Version="2025.218.2100" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
    <PackageReference Include="RSCG_CompositeProvider_Common" Version="2025.218.2100" />
  </ItemGroup>
```

Then if you have an interface like this

```csharp
public interface IDataFrom
{
    string Name { get; }
    Task<string> KeyFromValue(string value, bool isKey);
}
```

and multiple implementation of the interface like this

```csharp
class DataFromHttp : IDataValue
{
    public string Name { get { return "DataFromHttp"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        var http=new HttpClient();
        var result = await http.GetStringAsync("https://www."+ Guid.NewGuid().ToString()+".com/" + key);
        return result;
    }
}


class DataFromMemory : IDataValue
{
    public string Name { get { return "DataFromMemory"; } set { } }

    public async Task<string> KeyFromValue(string key, bool defaultValue)
    {
        await Task.Delay(1000);
        return $"this is value for {key} from memory";
    }
}
```

then you can call the composite provider to get data from all the implementation of the interface like this

```csharp

IDataValue provider = new DataValue_CP(new DataFromHttp(), new DataFromMemory());
var result = await provider.KeyFromValue("test", false);
Console.WriteLine(result);
DataValue_CP realClass = (DataValue_CP)provider ;
var lastInterface = realClass.lastUsedInterface ?? -1;
Console.WriteLine("value was obtained from " + realClass.Get(lastInterface).Name);
```

