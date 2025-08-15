# Tortuga Shipwright

## Installation


To register the Source Generator, add the following to your project file.

````xml
<!-- Code Generator -->
<ItemGroup>
	<PackageReference Include="Tortuga.Shipwright" Version="0.9.0" >
		<PrivateAssets>all</PrivateAssets>
	</PackageReference>
	<PackageReference Include="Tortuga.Shipwright.Shared" Version="0.9.0" />
</ItemGroup>

<PropertyGroup>
	<EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
	<CompilerGeneratedFilesOutputPath>Generated</CompilerGeneratedFilesOutputPath>
</PropertyGroup>

<ItemGroup>
	<!-- Don't include the output from a previous source generator execution into future runs; the */** trick here ensures that there's
at least one subdirectory, which is our key that it's coming from a source generator as opposed to something that is coming from
some other tool. -->
	<Compile Remove="$(CompilerGeneratedFilesOutputPath)/*/**/*.cs" />
</ItemGroup>
````

The `EmitCompilerGeneratedFiles` setting is not required, but it does make trouble-shooting easier. Check  `Show All Files" in Visual Studio to see the generated files.

## Trait Engine

### Terminology

* Trait: A set of methods and properties being injected into a container class.
* Container: The class that contains one or more traits.

### Basic Pattern

The trait needs no special decorations. However, it is advisable to mark it as `sealed` because inheritance is not supported with traits. 

Traits should be marked with the `Trait` attribute. (This is not currently enforced, but may be in future versions.)

Trait classes may be marked as `public` or, if in the same assembly, `internal`. 

The container class uses the `UseTrait` attribute and must be marked `partial`. For example:

````csharp
[UseTrait(typeof(MyTrait)]
public partial class MyContiner { ... }
````

### Exposing Members

For a method or property, add the `Expose` attribute to the member.

````csharp
[Expose] 
public int Add(int a, int b) {...}

[Expose] 
public int CustomerAge {get; set;}
````

The member being exposed must be visible to the container. This means `public` or, if in the same assembly, `internal`.

#### Non-public Members

To make a exposed member non-public in the container class, set the Accessibility property. For example,

````csharp
[Expose(Accessibility = Accessibility.Internal)]
public ICacheAdapter Cache { get; set; } = null!;
````


You may also set an inheritance rule such as `override`, `sealed`, or `virtual`.

````csharp
[Expose(Inheritance = Inheritance.Override)]
public ConcurrentDictionary<Type, object> ExtensionCache {get => m_ExtensionCache;}
````

#### Additional Attributes

The following attributes will be copied from an exposed trait member to the matching container member.

* EditorBrowsableAttribute
* ObsoleteAttribute

### Accessing the Container

To allow the trait to get a reference to it's container, use the `Container` attribute.


````csharp
[Container]
internal IDataSource DataSource { get; set; } = null!;
````

There is no limit to the number of `Container` properties in a trait. (Presumably each would request a different interface.)

If `RegisterInterface = true` is used, then the interface being requeted will be added to the container class. That class will still need to implement the interface.

### Callbacks into the container

In lieu of using a container property (see above), a trait can request a specific callback be created in the container.

Define the 'partial' property in the trait as a `Func` or `Action` delegate.

````csharp
[Partial("customerKey,startDate,endDate"] 
public Func<int, DateTime, DateTime, OrderCollection> OnGetOrdersByCustomer {get; set;} = null!;
````

In the container, the following will be generated.

````csharp
private partial OrderCollection OnGetOrdersByCustomer(int customerKey, DateTime startDate, DateTime endDate);
````


The container will then be responsible for implementing the partial method. 

### Automatically Implementing an Interface

If a trait implements an interface, then it's container will automatically implement it as well. All interface methods and properties will call back to the trait.

The container explicitly implements the interface. Use the `Expose` attribute on each member if you also want the methods to be marked as `public`.

Warning: Interfaces with `init` properties are not supported.

#### Additional Attributes

The following attributes will be copied from an exposed interface member to the matching container member.

* EditorBrowsableAttribute
* ObsoleteAttribute

### XML Docs

If the trait is in the same project as the container, XML Docs will be automatically included in the generated code.

This requires `DocumentationFile` to be enabled at the project level.

Shipwright does not currently support XML Docs on traits defined in a different project. (This appears to be a limitation of Roslyn.)



