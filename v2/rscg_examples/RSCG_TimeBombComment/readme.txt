# RSCG_TimeBombComment aka Time Bomb comment for technical debt
Reference the nuget package 

```xml
    <PackageReference Include="RSCG_TimeBombComment" Version="2023.5.9.2110"  PrivateAssets="all" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
```


Then just add :

//TB: 2021-09-13 this is a comment transformed into an error

and you will see the error!

The general form is

//TB: yyyy-MM-dd whatever here

## Examples

    
```cs
//TB: 2020-09-13 this is a comment transformed into an error
```

will produce an error


## Usage for technical debt 

When you have a 

//TODO

comment in your code, you can transform it into an error time bomb by adding the following line in your project file

//TB: yyyy-MM-dd whatever here
and on the date will produce an error when compiling the project

## Usage for obsolete methods
Imagine you have a method that is obsolete and you want to remember that you have to remove it.
Just put the following line in your project file


```cs
[Obsolete("should be deleted on the date on the right", TB_20210915)]
static string Test1()
{
    return "asdasd";
}
```

Then RSCG will create a static const boolean TB_20210915 that will be true if the date is less than 2021-09-15

Also, when you want to test something in your code, but give error if compiled with release

```csharp
//Just for debug: if(args.length>0) throw new ArgumentException();
//JFD: test
```

will raise error if compiled with 

dotnet build -c release

## Other Roslyn Source Code Generators

You can find more [Roslyn Source Code Generators](https://github.com/ignatandrei/rscg_examples/) at https://github.com/ignatandrei/rscg_examples/


# More Roslyn Source Code Generators

You can find more RSCG with examples at [Roslyn Source Code Generators](https://ignatandrei.github.io/RSCG_Examples/v2/)
