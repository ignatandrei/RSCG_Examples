// ReSharper disable once RedundantNullableDirective

#nullable enable

using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Aviationexam.GeneratedJsonConverters;

internal abstract class EnumJsonConvertor<T, TBackingType> : JsonConverter<T>
    where T : struct, Enum
    where TBackingType : struct
{
    protected abstract TypeCode BackingTypeTypeCode { get; }

    protected abstract EnumDeserializationStrategy DeserializationStrategy { get; }

    protected abstract EnumSerializationStrategy SerializationStrategy { get; }

    public abstract bool TryToEnum(ReadOnlySpan<byte> enumName, out T value);

    public abstract bool TryToEnum(TBackingType numericValue, out T value);

    public abstract TBackingType ToBackingType(T value);

    public abstract ReadOnlySpan<byte> ToFirstEnumName(T value);

    public override T Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options
    )
    {
        if (
            reader.TokenType is JsonTokenType.String
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseEnumName)
        )
        {
            var enumName = reader.ValueSpan;

            if (TryToEnum(enumName, out var enumValue))
            {
                return enumValue;
            }

            var stringValue = Encoding.UTF8.GetString(enumName.ToArray());

            throw new JsonException($"Undefined mapping of '{stringValue}' to enum '{typeof(T).FullName}'");
        }

        if (reader.TokenType is JsonTokenType.Number)
        {
            var numericValue = ReadAsNumber(ref reader);

            if (numericValue.HasValue)
            {
                if (TryToEnum(numericValue.Value, out var enumValue))
                {
                    return enumValue;
                }

                throw new JsonException($"Undefined mapping of '{numericValue}' to enum '{{enumFullName}}'");
            }
        }

        var value = Encoding.UTF8.GetString(reader.ValueSpan.ToArray());

        throw new JsonException($"Unable to deserialize {value}('{reader.TokenType}') into {typeof(T).Name}");
    }

    public override T ReadAsPropertyName(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options
    )
    {
        if (
            reader.TokenType is JsonTokenType.PropertyName
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseEnumName)
        )
        {
            var enumName = reader.ValueSpan;

            if (TryToEnum(enumName, out var enumValue))
            {
                return enumValue;
            }
        }

        var value = Encoding.UTF8.GetString(reader.ValueSpan.ToArray());

        if (
            reader.TokenType is JsonTokenType.PropertyName
            && DeserializationStrategy.HasFlag(EnumDeserializationStrategy.UseBackingType)
        )
        {
            var numericValue = ParseAsNumber(value);

            if (numericValue.HasValue)
            {
                if (TryToEnum(numericValue.Value, out var enumValue))
                {
                    return enumValue;
                }
            }
        }

        throw new JsonException($"Unable to deserialize {value}('{reader.TokenType}') into {typeof(T).Name}");
    }

    private TBackingType? ReadAsNumber(ref Utf8JsonReader reader) => BackingTypeTypeCode switch
    {
        TypeCode.SByte => reader.GetSByte() is var numericValue ? Unsafe.As<sbyte, TBackingType>(ref numericValue) : null,
        TypeCode.Byte => reader.GetByte() is var numericValue ? Unsafe.As<byte, TBackingType>(ref numericValue) : null,
        TypeCode.Int16 => reader.GetInt16() is var numericValue ? Unsafe.As<short, TBackingType>(ref numericValue) : null,
        TypeCode.UInt16 => reader.GetUInt16() is var numericValue ? Unsafe.As<ushort, TBackingType>(ref numericValue) : null,
        TypeCode.Int32 => reader.GetInt32() is var numericValue ? Unsafe.As<int, TBackingType>(ref numericValue) : null,
        TypeCode.UInt32 => reader.GetUInt32() is var numericValue ? Unsafe.As<uint, TBackingType>(ref numericValue) : null,
        TypeCode.Int64 => reader.GetInt64() is var numericValue ? Unsafe.As<long, TBackingType>(ref numericValue) : null,
        TypeCode.UInt64 => reader.GetUInt64() is var numericValue ? Unsafe.As<ulong, TBackingType>(ref numericValue) : null,
        _ => throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}")
    };

    private TBackingType? ParseAsNumber(
        string value
    ) => BackingTypeTypeCode switch
    {
        TypeCode.SByte => sbyte.TryParse(value, out var numericValue) ? Unsafe.As<sbyte, TBackingType>(ref numericValue) : null,
        TypeCode.Byte => byte.TryParse(value, out var numericValue) ? Unsafe.As<byte, TBackingType>(ref numericValue) : null,
        TypeCode.Int16 => short.TryParse(value, out var numericValue) ? Unsafe.As<short, TBackingType>(ref numericValue) : null,
        TypeCode.UInt16 => ushort.TryParse(value, out var numericValue) ? Unsafe.As<ushort, TBackingType>(ref numericValue) : null,
        TypeCode.Int32 => int.TryParse(value, out var numericValue) ? Unsafe.As<int, TBackingType>(ref numericValue) : null,
        TypeCode.UInt32 => uint.TryParse(value, out var numericValue) ? Unsafe.As<uint, TBackingType>(ref numericValue) : null,
        TypeCode.Int64 => long.TryParse(value, out var numericValue) ? Unsafe.As<long, TBackingType>(ref numericValue) : null,
        TypeCode.UInt64 => ulong.TryParse(value, out var numericValue) ? Unsafe.As<ulong, TBackingType>(ref numericValue) : null,
        _ => throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}")
    };

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        if (SerializationStrategy is EnumSerializationStrategy.BackingType)
        {
            WriteAsBackingType(writer, value, options);
        }
        else if (SerializationStrategy is EnumSerializationStrategy.FirstEnumName)
        {
            WriteAsFirstEnumName(writer, value, options);
        }
        else
        {
            throw new ArgumentOutOfRangeException(nameof(SerializationStrategy), SerializationStrategy, "Unknown serialization strategy");
        }
    }

    public override void WriteAsPropertyName(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        if (SerializationStrategy is EnumSerializationStrategy.BackingType)
        {
            WriteAsPropertyNameAsBackingType(writer, value, options);
        }
        else if (SerializationStrategy is EnumSerializationStrategy.FirstEnumName)
        {
            WriteAsPropertyNameAsFirstEnumName(writer, value, options);
        }
        else
        {
            throw new ArgumentOutOfRangeException(nameof(SerializationStrategy), SerializationStrategy, "Unknown serialization strategy");
        }
    }

    private void WriteAsBackingType(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var numericValue = ToBackingType(value);

        switch (BackingTypeTypeCode)
        {
            case TypeCode.SByte:
                writer.WriteNumberValue(Unsafe.As<TBackingType, sbyte>(ref numericValue));
                break;
            case TypeCode.Byte:
                writer.WriteNumberValue(Unsafe.As<TBackingType, byte>(ref numericValue));
                break;
            case TypeCode.Int16:
                writer.WriteNumberValue(Unsafe.As<TBackingType, short>(ref numericValue));
                break;
            case TypeCode.UInt16:
                writer.WriteNumberValue(Unsafe.As<TBackingType, ushort>(ref numericValue));
                break;
            case TypeCode.Int32:
                writer.WriteNumberValue(Unsafe.As<TBackingType, int>(ref numericValue));
                break;
            case TypeCode.UInt32:
                writer.WriteNumberValue(Unsafe.As<TBackingType, uint>(ref numericValue));
                break;
            case TypeCode.Int64:
                writer.WriteNumberValue(Unsafe.As<TBackingType, long>(ref numericValue));
                break;
            case TypeCode.UInt64:
                writer.WriteNumberValue(Unsafe.As<TBackingType, ulong>(ref numericValue));
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(BackingTypeTypeCode), BackingTypeTypeCode, $"Unexpected TypeCode {BackingTypeTypeCode}");
        }
    }

    private void WriteAsPropertyNameAsBackingType(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var numericValue = ToBackingType(value);

        writer.WritePropertyName($"{numericValue}");
    }

    private void WriteAsFirstEnumName(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var enumValue = ToFirstEnumName(value);

        writer.WriteStringValue(enumValue);
    }

    private void WriteAsPropertyNameAsFirstEnumName(
        Utf8JsonWriter writer,
        T value,
        [SuppressMessage("ReSharper", "UnusedParameter.Local")]
        JsonSerializerOptions options
    )
    {
        var enumValue = ToFirstEnumName(value);

        writer.WritePropertyName(enumValue);
    }
}
