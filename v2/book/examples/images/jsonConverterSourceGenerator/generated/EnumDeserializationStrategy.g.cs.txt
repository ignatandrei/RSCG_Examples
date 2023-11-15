// ReSharper disable once RedundantNullableDirective

#nullable enable

using Aviationexam.GeneratedJsonConverters.Attributes;
using System;

namespace Aviationexam.GeneratedJsonConverters;

[Flags]
[DisableEnumJsonConverter]
internal enum EnumDeserializationStrategy : byte
{
    ProjectDefault = 0,
    UseBackingType = 1 << 0,
    UseEnumName = 1 << 1,
}
