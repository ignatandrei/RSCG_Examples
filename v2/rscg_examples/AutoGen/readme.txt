# Antelcat.AutoGen

🇨🇳 [中文](./README.zh.md)

Auto generate anything you may want
> ~~unless we can't~~

## Supported

### `Antelcat.AutoGen.ComponentModel` :  

+ #### `[AutoStringTo(string, Accessibility)]` :  

    Auto generate string To extension

    only on `assembly` and `static partial class`

    ![AutoStringTo](./docs/GenerateStringTo.png)

+ #### `Mapping` :  

  + #### `[AutoMap(Accessibility)]` :  

    Auto generate mappings between types

    > Only on `partial method`

    ![AutoMapTo](./docs/GenerateMap.png)

    > You can use to generate `shallow copy`

  + #### `[MapBetween(fromProperty, toProperty)]` :  

    Specify property mapping between types

    + `By` : Method being called when mapping this property

  + #### `[MapIgnore]` :  

    To be ignored when generate mapping code

  + #### `[MapInclude(property)]` :  

    Explicit include properties when `[MapIgnore]`

  + #### `[MapExclude(string)]` :  

    To be excluded when mapping

  + #### `[MapConstructor(params string[])]` :  

    Specified property to be added in constructor, will auto detect if `null`


+ #### `[AutoFilePath]`:
  
  Auto generate `FilePath` which is `ref readonly struct`

    ```csharp
    void Fun([CallerFilePath] string path = "")
    {
        var directory       = (FilePath)path << 1;
        var full            = directory / "Antelcat.AutoGen.Sample" / "Example.cs";
        var changeExtension = full - 2 + ".g.cs";
    }
    ``` 

+ #### `[AutoDeconstructIndexable]`:

  Auto generate `Deconstruct` method for `IList<>` and custom types

    ```csharp
    [assembly: AutoDeconstructIndexable(16/*default size is 16*/, typeof(Foo))]
  
    int[] list = [1,2,3];
    var (a, b, c) = list;
  
    class Foo{
        public object this[int index] => index;
    }
  
    var (a, b, c, d) = new Foo();
    ```