namespace Union;

[FunicularSwitch.Generators.ResultType(ErrorType = typeof(ErrorDetails))]
public abstract partial class ResultSave<T> { };

public class ErrorDetails
{
    
}



    //[FunicularSwitch.Generators.UnionType]
    //public abstract partial class ResultSave { };

    //public sealed partial record Success(int Value): ResultSave;
    //public sealed partial record ValidationError(string Message):ResultSave;

    ////public sealed partial record Ok(T Value) : ResultSave<T>;

    ////public sealed partial record Error(Exception Exception) : ResultSave<T>;
