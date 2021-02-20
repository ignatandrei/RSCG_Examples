# RSGC Name: MockSourceGenerator

Nuget :
    https://www.nuget.org/packages/MockSourceGenerator/


link : https://github.com/hermanussen/MockSourceGenerator/ 


author :Robin Hermanussen


## What can do

This will generate Mock classes directly for any interface - with your implementation.

## The code that you start with is 

```

    public interface IMatOps               

    {

        public int Add(int a, int b);

    

        public int Division(int a, int b);

    }
```

The code that you will use is

```csharp


    var mock = (IMatOps)new MatOpsMock

    {

        MockAdd = (a, b) => a+b,

        MockDivision = (a,b)=> a/b

    };

```

The code that is generated is
```csharp


    public partial class MatOpsMock : global::MatOps.IMatOps                                                                                                           

    {

        /// <summary>

        /// Set this to true, if you want members that don't have a mock implementation

        /// to return a default value instead of throwing an exception.

        /// </summary>

        public bool ReturnDefaultIfNotMocked { get; set; }

    

        private System.Collections.Generic.List<HistoryEntry> historyEntries = new System.Collections.Generic.List<HistoryEntry>();

        public System.Collections.ObjectModel.ReadOnlyCollection<HistoryEntry> HistoryEntries

        {

            get

            {

                return historyEntries.AsReadOnly();

            }

        }

    

    

        /// <summary>

        /// Implemented for type global::MatOps.IMatOps (Public, same assembly: False)

        /// </summary>

        public Func<int,int,int>? MockAdd { get; set; }

        public int Add(int a, int b)

        {

            historyEntries.Add(new HistoryEntry("Add", new [] { $"{a}", $"{b}" }));

    

            if (MockAdd == null)

            {

                if (ReturnDefaultIfNotMocked)

                {

                    return default(int);

                }

                else

                {

                    throw new NotImplementedException("Method 'MockAdd' was called, but no mock implementation was provided");

                }

            }

    

            return MockAdd(a, b);

        }

    

        /// <summary>

        /// Implemented for type global::MatOps.IMatOps (Public, same assembly: False)

        /// </summary>

        public Func<int,int,int>? MockDivision { get; set; }

        public int Division(int a, int b)

        {

            historyEntries.Add(new HistoryEntry("Division", new [] { $"{a}", $"{b}" }));

    

            if (MockDivision == null)

            {

                if (ReturnDefaultIfNotMocked)

                {

                    return default(int);

                }

                else

                {

                    throw new NotImplementedException("Method 'MockDivision' was called, but no mock implementation was provided");

                }

            }

    

            return MockDivision(a, b);

        }

    }

```


Example Code: <a href="https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking" rel="noopener" target="_blank">https://github.com/ignatandrei/RSCG_Examples/tree/main/DynamicMocking</a>

All Generators: <a href="https://github.com/ignatandrei/RSCG_Examples/">https://github.com/ignatandrei/RSCG_Examples/</a>