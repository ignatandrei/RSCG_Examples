using Sera.TaggedUnion;
namespace UnionTypesDemo;


[Union]
public partial struct ResultSave
{
    [UnionTemplate]
    private interface ITemplate
    {
        int Ok();
        void NotFound();
    }
}

