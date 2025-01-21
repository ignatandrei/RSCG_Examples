[![NuGet version](https://img.shields.io/nuget/v/rscg_Interface_to_null_object.svg?style=flat-square)](https://www.nuget.org/packages/rscg_Interface_to_null_object)

[![NuGet version](https://img.shields.io/nuget/v/rscg_Interface_to_null_object_common.svg?style=flat-square)](https://www.nuget.org/packages/rscg_Interface_to_null_object_common)


# Interface to Null Object Pattern
Implementation of https://en.wikipedia.org/wiki/Null_object_pattern  from interface

# Installation

Add to your csproj file:

```xml
  <ItemGroup>
    <PackageReference Include="rscg_Interface_to_null_object" Version="2025.120.1832"  OutputItemType="Analyzer" ReferenceOutputAssembly="false"  />
    <PackageReference Include="rscg_Interface_to_null_object_common" Version="2025.120.1832" />
  </ItemGroup>
	<PropertyGroup>
		<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
		<CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)\GX</CompilerGeneratedFilesOutputPath>
	</PropertyGroup>
```

Or add the nuget packages rscg_Interface_to_null_object  and rscg_Interface_to_null_object_common

# Usage

```csharp
[InterfaceToNullObject.ToNullObject]
public interface IEmployee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IDepartment Department { get; set; }
    public string GetFullName();
  
}
```

And then a C# class that implements the interface will be generated

```csharp
public partial class Employee_null : global::IntegrationConsole.IEmployee
{

        public virtual string FirstName { get; set; } = default(string);
    
        public virtual string LastName { get; set; } = default(string);
    
        public virtual IntegrationConsole.IDepartment Department { get; set; } = default(IntegrationConsole.IDepartment);
    
        public virtual string GetFullName() { return default(string); }
    
}
```



