# Fluent APIs in C#

Everybody wants to use fluent APIs but writing them is tedious. With this library providing fluent APIs for your classes becomes a breeze. Simply annotate them with attributes and the source code for the fluent API will be generated. The fluent API library leverages incremental source code generation at development time and your IDE will offer you the corresponding code completion immediately.

The generated code follows the builder design pattern and allows you to construct objects step by step. This approach avoids big constructors and results in very readable code. 

[![license](https://img.shields.io/badge/license-MIT-brightgreen)](https://github.com/m31coding/M31.BinarySearchTrees/blob/master/LICENSE)
[![.net version](https://img.shields.io/badge/.NET-Standard%202.0-6D429C)](https://dotnet.microsoft.com/en-us/)
[![version](https://img.shields.io/nuget/v/M31.FluentApi)](https://www.nuget.org/packages/M31.FluentApi/)
[![CI](https://github.com/m31coding/M31.FluentAPI/actions/workflows/ci.yml/badge.svg)](https://github.com/m31coding/M31.FluentAPI/actions/workflows/ci.yml)
[![m31coding](https://img.shields.io/badge/www-m31coding.com-34345B)](https://www.m31coding.com)
[![youtube](https://img.shields.io/badge/youtube-kevin%20schaal-FF0000.svg)](https://www.youtube.com/channel/UC6CZ_Bcyql1kfHZvx9W85mA)
[![twitter](https://img.shields.io/badge/twitter-@m31coding-1DA1F2.svg)](https://twitter.com/m31coding)

Accompanying blog post: [www.m31coding.com>blog>fluent-api](https://www.m31coding.com/blog/fluent-api.html)

# Installing via NuGet

Install the latest version of the package `M31.FluentAPI` via your IDE or use the package manager console:

```
PM> Install-Package M31.FluentApi
```

A package reference will be added to your `csproj` file. Moreover, since this library provides code via source code generation, consumers of your project don't need the reference to `M31.FluentAPI`. Therefore, it is recommended to use the `PrivateAssets` metadata tag:

```xml
<PackageReference Include="M31.FluentApi" Version="1.0.0" PrivateAssets="all"/>
```

If you would like to examine the generated code, you may emit it by adding the following lines to your `csproj` file:

```xml
<PropertyGroup>
    <CompilerGeneratedFilesOutputPath>$(BaseIntermediateOutputPath)Generated</CompilerGeneratedFilesOutputPath>
    <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

The code can then be found in the `obj/Generated` folder.

# Usage

If you use this library for the first time I recommend that you read the storybook: [M31.FluentApi.Storybook.csproj>Program.cs](src/M31.FluentApi.Storybook/Program.cs).

Here is an example that uses all of the available attributes:

```cs
[FluentApi]
public class Student
{
    [FluentMember(0, "Named", 0)]
    public string FirstName { get; private set; }

    [FluentMember(0, "Named", 1)]
    public string LastName { get; private set; }

    [FluentMember(1, "OfAge")]
    public int Age { get; private set; }

    [FluentMethod(1)]
    private void BornOn(DateOnly dateOfBirth)
    {
        DateOnly today = DateOnly.FromDateTime(DateTime.Today);
        int age = today.Year - dateOfBirth.Year;
        if (dateOfBirth > today.AddYears(-age)) age--;
        Age = age;
    }

    [FluentMember(2, "InSemester")]
    [FluentDefault("WhoStartsUniversity")]
    public int Semester { get; private set; } = 0;

    [FluentMember(3, "LivingIn")]
    [FluentDefault("LivingInBoston")]
    [FluentNullable("InUnknownCity")]
    public string? City { get; private set; } = "Boston";

    [FluentPredicate(4, "WhoIsHappy", "WhoIsSad")]
    [FluentNullable("WithUnknownMood")]
    public bool? IsHappy { get; private set; }

    [FluentCollection(5, "Friend", "WhoseFriendsAre", "WhoseFriendIs", "WhoHasNoFriends")]
    public IReadOnlyCollection<string> Friends { get; private set; }
 }
```

![fluent-api-usage](media/fluent-api.gif)

You may have a look at the generated code for this example: [CreateStudent.g.cs](src/M31.FluentApi.Tests/CodeGeneration/TestClasses/StudentClass/CreateStudent.g.cs). Note that if you use private members or properties with a private set accessor, as it is the case in this example, the generated code will use reflection in order to set the properties 'by force'.

## Attributes

The attributes `FluentApi` and `FluentMember` are the basic attributes; they are all you need in order to get started. The attributes `FluentPredicate` and `FluentCollection` can be used instead of a `FluentMember` attribute if the decorated member is a boolean or a collection, respectively. `FluentDefault` and `FluentNullable` are orthogonal attributes and used in combination with the attributes above. Finally, the `FluentMethod` attribute is used for custom implementations.

---

### FluentApi

**Definition**: FluentApiAttribute(string builderClassName = "Create{Name}")

Use this attribute for your class / struct / record. The optional parameter allows you to specify the name of the builder class that will be generated. Within the argument the template `{Name}` can be used, which will be replaced by the name of your decorated type.

---

### FluentMember

**Definition**: FluentMemberAttribute(int builderStep, string method = "With{Name}", int parameterPosition = 0)

Use this attribute for fields and properties of your class. They can be private but properties must have a set accessor. The `builderStep` parameter specifies the step in which the member can be set. With the method parameter you can specify the name of the builder method.

If two `FluentMember` attributes with the same builder step are used, either a compound method or a fork will be created.
If the specified method names are equal, a compound method will be created, which is a builder method that sets multiple properties at once. See the `WithName` method in the example above. For compounds the position of the parameters can be controlled by the last parameter of this attribute.<br/>
If the specified method names differ, a fork will be created. That means that there are multiple methods at this step but you can call only one. See the `OfAge` and `BornOn` methods in the example above.

---

### FluentPredicate

**Definition**: FluentPredicateAttribute(int builderStep, string method = "{Name}", string negatedMethod = "Not{Name}")

Can be used instead of a `FluentMember` attribute if the decorated member is of type `bool`. This attribute generates two methods, one for setting the value of the member to `true` and one for setting it to `false`.

---

### FluentCollection

**Definition**: FluentCollectionAttribute(
    int builderStep,
    string singularName,
    string withItems = "With{Name}",
    string withItem = "With{SingularName}",
    string withZeroItems = "WithZero{Name}")

Can be used instead of a `FluentMember` attribute if the decorated member is a collection. This attribute generates methods for setting multiple items, one item and zero items. The supported collection types can be seen in the source file [CollectionInference.cs](src/M31.FluentApi.Generator/SourceGenerators/Collections/CollectionInference.cs). 

---

### FluentDefault

**Definition**: FluentDefaultAttribute(string method = "WithDefault{Name}")

Can be used for fields and properties in addition to other attributes. When the generated builder method is called the member will keep its initial value.

---

### FluentNullable

**Definition**: FluentNullableAttribute(string method = "Without{Name}")

Can be used for fields and properties in addition to other attributes. Generates a builder method that sets the member to `null`.

---

### FluentMethod

**Definition**: FluentMethodAttribute(int builderStep, string method = "{Name}")

Use this attribute on methods in order to provide a custom implementation for setting values or triggering additional behavior. The decorated method must return `void`.

# When not to use this library

This library generates a builder class for initializing objects step by step. There are use cases for simpler builder classes that don't offer a step by step initialization. E.g. consider the following API for combining hash codes:

```cs
HashCode hashCode = new HashCode()
    .Add(42).Add(3.14).AddSequence(new[] { 1, 2, 3 }).Add("Hello world");
```

The `Add` and `AddSequence` methods can be called any number of times and in any order. This behavior can not be modeled with the fluent API library. In order to create such a builder class I suggest to write the code by hand, since the implementation is straight forward and does not require a lot of additional code.

# Problems with the IDE

As of 2023 code generation with Roslyn is still a relatively new feature but is already supported quite well in Visual Studio and Rider. Since code generation is potentially triggered with every single key stroke, there are sometimes situations where the code completion index of the IDE does not keep up with all the changes.

In particular, if your IDE visually indicates that there are errors in your code but it compiles and runs just fine, try the following things:

- Rebuild the project or the whole solution
- Unload and reload the project
- Close and reopen the IDE
- Remove the .vs folder (Visual Studio) or the .idea folder (Rider)

# Contributing

Would you like to improve this project? You are kindly invited to contribute. If you would like to implement a new feature, please create a GitHub issue and you will receive timely feedback.

Happy coding!
