# MagicMap

SourceGenerator based package for generating boilerplate code like object mappers

This is still under construction

Mapping code from one class to another

```C#
public class Person
{
   public string Name { get; set; } 
   public int Age { get; set; } 
}

public class PersonModel
{
   public string Name { get; set; }
   public int Age { get; set; }
}

```

The required code to write

```C#
[TypeMapper(typeof(Person), typeof(PersonModel))]
internal partial class PersonMapper {  }
```

Usage

```C#
var source = new Person { Name = "Peter", Age = 34 };
var model = source.ToPersonModel();
```
