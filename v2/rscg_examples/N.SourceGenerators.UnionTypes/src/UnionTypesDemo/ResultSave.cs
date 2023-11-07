using N.SourceGenerators.UnionTypes;
namespace UnionTypesDemo;
public record Success(int Value);
public record ValidationError(string Message);

[UnionType(typeof(Success))]
[UnionType(typeof(ValidationError))]
public partial class ResultSave
{
}


