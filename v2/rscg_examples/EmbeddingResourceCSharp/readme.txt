# EmbedResourceCSharp

This is a [C# Source Generator](https://devblogs.microsoft.com/dotnet/new-c-source-generator-samples/).
This let you embed files in your application.
You do not need to use `Assembly.GetManifestResourceStream` anymore.

# How to use

## Install

```sh
dotnet add package EmbedResourceCSharp
```

Add only 1 package to your C# project.

## Embedding file

Provide that there are some files like below.

- projectFolder/
  - Example.csproj
  - ExampleProgram.cs
  - resourceFileA.txt

```csharp
namespace Example
{
    // partial methods require partial class/struct!
    public partial class ExampleClass
    {
        /*
            The relative file path from C# project folder should be specified.
            The return value type must be System.ReadOnlySpan<byte>.
            No parameter must exist.
            The method must be static and partial.
            The accessibility of the method does not matter.
        */
        [EmbedResourceCSharp.FileEmbed("resourceFileA.txt")]
        private static partial System.ReadOnlySpan<byte> GetFileContentA();
    }
}
```

You can get file content byte sequence with static partial method `System.ReadOnlySpan<byte> GetFileContentA`.

## Embedding files under specific folder

Provide that there are some files like below.

- projectFolder/
  - Example2.csproj
  - ExampleProgram.cs
- folderB/
  - resourceA.txt
  - resourceB.txt
  - folderB_C/
    - resourceC.txt
  - resourceD.csv

```csharp
namespace Example2
{
    // partial methods require partial class/struct!
    public partial class ExampleClass
    {
        /*
            The relative folder path from C# project folder should be specified. The folder path should end with slash or backslash.
            The return value type must be System.ReadOnlySpan<byte>.
            One parameter must exist and its type must be System.ReadOnlySpan<char>. The parameter name does not matter.
            The method must be static and partial.
            The accessibility of the method does not matter.
        */
        [EmbedResourceCSharp.FolderEmbed("../folderB/", "*.txt")]
        private static partial System.ReadOnlySpan<byte> GetResouceFileContent(System.ReadOnlySpan<char> path);

        public static void Main()
        {
            // Specify relative path from the folder.
            var aContent = GetResouceFileContent("resourceA.txt");
            var bContent = GetResouceFileContent("resourceB.txt");
            var cContent = GetResouceFileContent("folderB_C/resourceC.txt");
            // var dContent = GetResouceFileContent("resourceD.csv");
            // Above method call throws an FileNotFoundException!
        }
    }
}
```

You can include all files under the target folder recursively.
You can filter file with search pattern.
