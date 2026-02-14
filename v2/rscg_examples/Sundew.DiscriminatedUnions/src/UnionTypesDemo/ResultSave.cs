
using Sundew.DiscriminatedUnions;

namespace UnionTypesDemo;


[DiscriminatedUnion]
public abstract partial record ResultSave
{

    public sealed partial record Ok(int i) : ResultSave;

    public sealed partial record NotFound():ResultSave ;
    
}

