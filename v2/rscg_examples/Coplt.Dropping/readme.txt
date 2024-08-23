# Coplt.Dropping

[![Nuget](https://img.shields.io/nuget/v/Coplt.Dropping)](https://www.nuget.org/packages/Coplt.Dropping/)
![MIT](https://img.shields.io/github/license/2A5F/Coplt.Dropping)

Auto gen dispose pattern

- Auto handle `Dispose(bool dispoing)` pattern
- Auto handle destructor/finalizer
- Allow multiple drops
- Specify the drop order `[Drop(Order = X)]`
- The first argument of `Drop` target method can be `bool disposing`
- Mark Drop directly on fields and properties (requires target type have `Dispose` method)
- Dose not supported `AsyncDispose`, too complicated, it is recommended to implement it manually
- `Drop` can mark on static methods, will pass `this` on first argument, if have `bool disposing` will be the second argument

## Example

- Basic usage
    
    ```cs
    [Dropping]
    public partial class Foo1
    {
        [Drop]
        public void Drop()
        {
            Console.WriteLine(1);
        }
    }
    ```
    
    Generate output:

    <details>
      <summary>Foo1.dropping.g.cs</summary>
    
    
    </details>
    <br/>
  
