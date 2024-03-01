[![NuGet](https://img.shields.io/nuget/v/AutoInvoke.Generator.svg?style=flat-square)](https://www.nuget.org/packages/AutoInvoke.Generator/)
[![GitHub license](https://img.shields.io/github/license/LokiMidgard/AutoInvoke.Generator.svg?style=flat-square)](https://tldrlegal.com/license/mit-license#summary)
# AutoInvoke

This Generator let you anotate an Parameterless Generic Method with exactly one TypeArgument.

It will then generate a method with the same name and no type arguments that calls your anotated
method for every (non static) Type decleared in your project, that satisfies the type constraints.



## Sample

Assume you have the following Interface:

```c#
internal interface IFileLoder {
    public abstract static IFileLoder Init(string path);
    public abstract static string FileExtension { get; }
}
```

This describes a File loader for different types in our project.

And following implementation: 

```c#
internal class AudioLoader : IFileLoder {
    public static string FileExtension => ".mp3";

    public static IFileLoder Init(string Path) {
        return new AudioLoader(path);
    }
    // the rest of the code...
}
```

Which defines how we want to load mp3 files.

We now want to automaticly get a list of all `IFileLoader` so we know what files we can handle,
and we do not want to manualy handel such a list. 

An Implementation could look like this:

```c#
internal delegate IFileLoder LoadFile(string path);
internal partial class FileHandler {
    private readonly Dictionary<string, LoadFile> loaders = new();

    public FileHandler() {
        LoadLoaders();
    }

    public void LoadFile(string file) {
        if (loaders.TryGetValue(Path.GetExtension(file), out var loaderFactory)) {
            var loader = loaderFactory(file);
            // use loader to do things
        }
    }


    [AutoInvoke.Generator.FindAndInvoke]
    public void LoadLoaders<T>() where T : IFileLoder {
        this.loaders.Add(T.FileExtension, T.Init);
    }
}
```

The field loaders will have all extensions our code can handle, and has to every extension
the corresponding `Init`-Method.

The Generated code will look like this:

```c#
partial class FileHandler {
    private void LoadLoaders() {
        LoadLoaders<AutoInvoke.Generator.Example.AudioLoader>();
    }
}
```


## Featurs and limitations

- You can control wich type of types shold get called. E.g. by
  default no calls are generated for abstract classes or types defined in referenced Assemblys. But you can overide this setting
- The anotated method can be static
- If the anotated method has parameters the generated method has the same parametrs
- If the return type is not `void` the generated methods returntype is an array of the return type of the attributed method

### Limitations
- When using multiple Type Parameters, one Type Parameter must contain all others (transitiv) like `Foo<T1, T2, T3>() where T1: IComparable<T2> where T2 : IComparable<T3>`
- You can't call static Types. Generics do not allow this.


