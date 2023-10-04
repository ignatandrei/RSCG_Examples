# Disposer

A Source Generator package that generates extension methods for enums, to allow fast "reflection".

> This source generator requires the .NET 6 SDK. You can target earlier frameworks like .NET Core 3.1 etc, but the _SDK_ must be at least 6.0.100

Add the package to your application using

```bash
dotnet add package Disposer
```


This adds a `<PackageReference>` to your project. You can additionally mark the package as `PrivateAsets="all"`.

> Setting `PrivateAssets="all"` means any projects referencing this one won't get a reference to the _Disposer_ package. <br/>

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <PackageReference Include="Disposer" Version="1.0.0" 
    PrivateAssets="all" />

</Project>
```

Adding the package will automatically add a marker attribute, `[Disposable]`, to your project.

To use the generator, add the `[EnumExtensions]` attribute to an enum. For example:

```csharp
[Disposer.Disposable]
public class MyClass
{
    partial void DisposeManaged()
    {
        // free managed resources here
    }

    partial void DisposeUnmanaged()
    {
        // free Unmanaged resources here
    }
}
```

This will generate a class another partial class which implement `IDisposable` interface:

```csharp
partial class MyClass : global::System.IDisposable
{
    partial void DisposeManaged();
    partial void DisposeUnmanaged();

    private bool disposed = false;

    ~MyClass()
    {
        Dispose(false);
    }

    private void Dispose(bool disposing)
    {
        if (disposed)
            return;

        if (disposing)
        {
            DisposeManaged();
        }

        DisposeUnmanaged();

        disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }
}
```