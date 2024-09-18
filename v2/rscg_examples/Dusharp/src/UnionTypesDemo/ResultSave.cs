using Dusharp;
namespace UnionTypesDemo;


[Union]
public partial class ResultSave
{
    [UnionCase]
    public static partial ResultSave Ok(int i);
    [UnionCase]
    public static partial ResultSave NotFound();
    
}

