

namespace UnionTypesDemo;


[ScottEncoding]
public abstract partial class ResultSave<T>
{

    public sealed partial class Ok
    {
        public Ok(T value) => Value = value;
        public T Value { get; }
    }

    public sealed partial class None
    {
        public None() { }
    }

}

