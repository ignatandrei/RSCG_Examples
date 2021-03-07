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