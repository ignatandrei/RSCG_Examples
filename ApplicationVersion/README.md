# RSCG number 1 : ThisAssembly

Nuget :
    https://www.nuget.org/packages/ThisAssembly


link : https://www.clarius.org/ThisAssembly/ 


author :Daniel Cazzulino


## What can do

The ThisAssembly.Info allows you access to the Assembly Information as constants, instead of going to reflection each time. I found useful to see the assembly version right away in any project that I have.

## The code that you start with is 


<img src='http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/ExistingCode.cs.png' />

<a href='http://ignatandrei.github.io/RSCG_Examples/images/ThisAssembly/ExistingCode.cs' target='_blank'>code</a>


```

    <PropertyGroup>

    <Version>2021.2.15.800</Version>

    </PropertyGroup>
```

The code that you will use is

```csharp


    var strVersion=ThisAssembly.Info.Version;

    Console.WriteLine(strVersion);

```

The code that is generated is
```csharp


        /// <summary> 

        /// Provides access to the current assembly information as pure constants, 

        ///  without requiring reflection.

        /// </summary>

        partial class ThisAssembly

        {

            /// <summary>

            /// Gets the AssemblyInfo attributes.

            /// </summary>

            [GeneratedCode("ThisAssembly.AssemblyInfo", "1.0.0")]

            [CompilerGenerated]

            public static partial class Info

            {

                public const string Company = @"RSCG_Version";

    

                public const string Configuration = @"Debug";

    

                public const string FileVersion = @"2021.2.15.800";

    

                public const string InformationalVersion = @"2021.2.15.800";

    

                public const string Product = @"RSCG_Version";

    

                public const string Title = @"RSCG_Version";

    

                public const string Version = @"2021.2.15.800";

    

            }

        }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/ApplicationVersion</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>