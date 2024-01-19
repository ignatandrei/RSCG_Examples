namespace Union;

[Funcky.DiscriminatedUnion]
public abstract partial record ResultSave
{
    public partial record Success(int Value): ResultSave;
    public partial record ValidationError(string Message):ResultSave;

    //public sealed partial record Ok(T Value) : ResultSave<T>;

    //public sealed partial record Error(Exception Exception) : ResultSave<T>;
}