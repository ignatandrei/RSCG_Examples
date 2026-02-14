# Discriminated Unions

Sundew.DiscriminatedUnions implement discriminated unions for C#, until a future version of C# provides it out of the box.
The idea is that this package can be deleted once unions are supported in C#, without requiring changes to switch expressions and statements.

In addition, the project supports dimensional unions through default interface methods (traits).
A dimensional union is a union where cases can be reused in any number of unions, by supporting interface unions through the possibility of implementing multiple interface and default interface members.

## How it works
A Roslyn analyzer asserts and report errors in case switch statements or switch expression do not handle all cases.
C# 8 and 9 already comes with great pattern matching support for evaluation.

In order that the inheritance hierarchy remain closed (All cases in the same assembly), an analyzer ensures that unions are not derived from in referencing assemblies.
Similarly all case classes should be sealed.

Create a union by inheriting from an abstract base (record) class (or interface) marked with the DiscriminatedUnion attribute to build various cases.
Either specify the partial keyword to the union for a source generator to implement factory methods or use the codefix PDU0001 to generate them.

## Sample
### Defining a union
```csharp
[Sundew.DiscriminatedUnions.DiscriminatedUnion]
public abstract partial record Result
{
    public sealed partial record Success : Result;

    public sealed partial record Warning(string Message) : Result;

    public sealed partial record Error(int Code) : Result;
}
```
Alternatively, a union can be defined with unnested case classes and interfaces, allowing the possibility of creating dimensional unions (see below).

### Evaluation
```csharp
var message = result switch
{
    Result.Error { Code: > 70 } error => $"High Error code: {error.Code}",
    Result.Error error => $"Error code: {error.Code}",
    Result.Warning { Message: "Tough warning" } => "Not good",
    Result.Warning warning => warning.Message,
    Result.Success => "Great",
};
```

### Dimensional unions
To support dimensional unions, unnested cases help because the cases are no longer defined inside a union. However, for this to work the unions are required to declare a factory method named exactly like the case type and that has the CaseType attribute specifying the actual type.
Since version 3, factory methods are generated when the union is declared partial. Alternatively, a code fix (PDU0001) is available to generate the factory methods. 

```csharp
[Sundew.DiscriminatedUnions.DiscriminatedUnion]
public partial interface IExpression;

[Sundew.DiscriminatedUnions.DiscriminatedUnion]
public partial interface IArithmeticExpression : IExpression;

[Sundew.DiscriminatedUnions.DiscriminatedUnion]
public partial interface ICommutativeExpression : IArithmeticExpression;

public sealed partial record AdditionExpression(IExpression Lhs, IExpression Rhs) : ICommutativeExpression;

public sealed partial record SubtractionExpression(IExpression Lhs, IExpression Rhs) : IArithmeticExpression;

public sealed partial record MultiplicationExpression(IExpression Lhs, IExpression Rhs) : ICommutativeExpression;

public sealed partial record DivisionExpression(IExpression Lhs, IExpression Rhs) : IArithmeticExpression;

public sealed partial record ValueExpression(int Value) : IExpression;
```

#### Evaluating dimensional unions
With dimensional unions it is possible to handle all cases using a sub union.
As seen in the example below, handling the ArithmeticExpression covers Addition-, Subtraction-, Multiplication- and DivisionExpression.
Typically one would dispatch these to a method handling ArithmeticExpression and where handling all cases would be checked, but it is not required.
This makes it convienient to separate handling logic in smaller chucks of code.

```csharp
public int Evaluate(Expression expression)
{
    return expression switch
        {
            ArithmeticExpression arithmeticExpression => Evaluate(arithmeticExpression),
            ValueExpression valueExpression => valueExpression.Value,
        };
}

public int Evaluate(ArithmeticExpression arithmeticExpression)
{
    return arithmeticExpression switch
        {
            AdditionExpression additionExpression => Evaluate(additionExpression.Lhs) + Evaluate(additionExpression.Rhs),
            SubtractionExpression subtractionExpression => Evaluate(subtractionExpression.Lhs) - Evaluate(subtractionExpression.Rhs),
            MultiplicationExpression multiplicationExpression => Evaluate(multiplicationExpression.Lhs) * Evaluate(multiplicationExpression.Rhs),
            DivisionExpression divisionExpression => Evaluate(divisionExpression.Lhs) / Evaluate(divisionExpression.Rhs),
        };
}
```

#### Enum evaluation
As of version 5.1, regular enums can also use the DiscriminatedUnion attribute causing the analyzer to exhaustively check switch statements and expressions.

## Generator features
As mentioned a source generator is automatically activated for generating factory methods when the partial keyword is specified.
In addition, the DiscriminatedUnion attribute can specify a flags enum (GeneratorFeatures) to control additional code generation.

* Segregate - Generates an extension method for IEnumerable<TUnion> that segregates all items into buckets of the different result.

## Supported diagnostics:
| Diagnostic Id | Description                                                                                                               | Code Fix |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | :------: |
| SDU0001       | Switch does not handled all cases                                                                                         |   yes    |
| SDU0002       | Switch should not handle default case                                                                                     |   yes    |
| SDU0003       | Switch has unreachable null case                                                                                          |   yes    |
| SDU0004       | Class unions must be abstract                                                                                             |   yes    |
| SDU0005       | Only unions can extended other unions                                                                                     |    no    |
| SDU0006       | Unions cannot be extended outside their assembly                                                                          |    no    |
| SDU0007       | Cases must be declared in the same assembly as their unions                                                               |    no    |
| SDU0008       | Cases should be sealed                                                                                                    |   yes    |
| SDU0009       | Unnested cases should have factory method                                                                                 | PDU0001  |
| SDU0010       | Factory method should have correct CaseTypeAttribute                                                                      |   yes    |
| SDU0011       | Reported when a case is implemented by throwing NotImplementedException, because CodeCleanup may siliently 'fix' SDU0001. |   yes    |
| SDU0012       | Reported when a case contains type parameters that are not in the union type parameter list.                              |   yes    |
| PDU0001       | Make union/case partial for code generator                                                                                |   yes    |
| PDU0002       | Populate union factory methods                                                                                            |   yes    |
| SDU9999       | Switch should throw in default case                                                                                       |    no    |
| GDU0001       | Discriminated union declaration could not be found                                                                        |    no    |

## Issues/Todos
* Switch appears with red squiggly lines in VS: https://github.com/dotnet/roslyn/issues/57041
* Nullability is falsely evaluated when the switch hints null is possible: https://github.com/dotnet/roslyn/issues/57042