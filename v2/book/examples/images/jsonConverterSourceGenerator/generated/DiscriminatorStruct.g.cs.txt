// ReSharper disable once RedundantNullableDirective

#nullable enable

namespace Aviationexam.GeneratedJsonConverters;

internal readonly struct DiscriminatorStruct<T> : IDiscriminatorStruct
{
    public T Value { get; init; }

    public DiscriminatorStruct(T value)
    {
        Value = value;
    }
}
