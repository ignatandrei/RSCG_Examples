using OneOf;
namespace OneOfDemo;

[GenerateOneOf]
public partial class StringOrNumber : OneOfBase<string, int> {
    public (bool isNumber, int number) TryGetNumber() =>
           Match( //this match function is auto generated
               s => (int.TryParse(s, out var n), n),
               i => (true, i)
           );
}
