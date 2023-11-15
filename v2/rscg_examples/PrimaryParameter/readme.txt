# Primary Parameter
[![NuGet version (FaustVX.PrimaryParameter.SG)](https://img.shields.io/nuget/v/FaustVX.PrimaryParameter.SG.svg)](https://www.nuget.org/packages/FaustVX.PrimaryParameter.SG/)
[![Update NuGet](https://github.com/FaustVX/PrimaryParameter/actions/workflows/pushToNuget.yaml/badge.svg)](https://github.com/FaustVX/PrimaryParameter/actions/workflows/pushToNuget.yaml)

## Description
Using a `Field` or `RefField` or `Property` attribute on parameters.

Automatically generate `private readonly` fields or `private readonly ref readonly` fields or `public` properties.

Forbid the use of primary constructor's parameters.

## Usage

```cs
partial class C([Field(Name = "_a", AssignFormat = "{0}.ToString()", Type = typeof(string)), Field(Name = nameof(C._b)), Field, Property(WithInit = true)]int i) // type must be partial, but can be class / struct
{
# region Generated members
    // private readonly string _a = i.ToString();   // generated field (with type and formated assignment)
    // private readonly int _b = i;                 // generated field (with computed name)
    // private readonly int _i = i;                 // generated field
    // private int { get; init; } = i;              // generated Property
# endregion

    public void M0()
    {
        i++;                    // error on usage of i
        Console.WriteLine(i);   // error on usage of i
    }

    public void M1()
    {
        var i = 0;
        i++;                    // don't error on usage of locals
        Console.WriteLine(_i);  // automaticaly created readonly field
        Console.WriteLine(_a);  // automaticaly created readonly field based on Name property
        Console.WriteLine(I);   // automaticaly created readonly property
    }
}

ref partial struct Ref([RefField(IsReadonlyRef = false, IsRefReadonly = false), RefField(Name = nameof(Ref.I), Scope = "public")]int i)
{
# region Generated members
    private ref int _i = ref i;
    public readonly ref readonly int I = ref i;
# endregion
}
```

To enable the feature, type `[Field]` or `[RefField]` or `[Property]` before the primary parameter you want.

You can type as many attributes as you want on a single parameter.

## Attribute Properties
|Attribute|Property|Comments|Default value|
|---------|--------|--------|-------------|
|`Field`|`Name`|Property to modify the generated field name|`_i` (for a parameter named `i`)|
||`IsReadnoly`|To generate the `readonly` modifier|`true`|
||`Scope`|To change the scope of the generated property|`private`|
||`AssignFormat`|To change the assignment for that field|`{0}`|
||`Type`|To change the type for that field|same type as parameter|
|`RefField`|`Name`|Property to modify the generated field name|`_i` (for a parameter named `i`)|
||`IsReadnolyRef`|To generate the `readonly ref` modifier|`true`|
||`IsRefReadnoly`|To generate the `ref readonly` modifier|`true`|
||`Scope`|To change the scope of the generated property|`private`|
|`Property`|`Name`|Property to modify the generated field name|`I` (for a parameter named `i`)|
||`WithInit`|To generate the `init` accessor along the `get`|`false`|
||`Scope`|To change the scope of the generated property|`public`|
||`AssignFormat`|To change the assignment for that property|`{0}`|
||`Type`|To change the type for that property|same type as parameter|


## `.csproj` properties
|Property|Description|Default value|
|--------|-----------|-------------|
|Fields|||
|`PrimaryParameter_Field_DefaultScope`|The default scope for fields generation|`private`|
|`PrimaryParameter_Field_DefaultReadonly`|Should fields generates with `readonly` modifier|`true`|
|Ref Fields|||
|`PrimaryParameter_RefField_DefaultScope`|The default scope for `ref` field generation|`private`|
|`PrimaryParameter_RefField_DefaultReadonlyRef`|Should `ref` fields generates with `readonly ref` modifier|`true`|
|`PrimaryParameter_RefField_DefaultRefReadonly`|Should `ref` fields generates with `ref readonly` modifier|`true`|
|Properties|||
|`PrimaryParameter_Property_DefaultScope`|The default scope for properties generation|`public`|
|`PrimaryParameter_Property_DefaultWithInit`|Should properties generates with `init` accessor|`true`|

