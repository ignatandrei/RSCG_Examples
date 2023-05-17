using Dunet;
namespace duneDemo;

[Union]
partial record WhatIsTheString
{
    partial record IsString(string value);
    partial record IsLong(long value);
    partial record IsDate(DateTime value);

    partial record IsNullWhiteSpace();

    public static WhatIsTheString FromString(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return new IsNullWhiteSpace();

        if(long.TryParse(value, out var longValue))
        {
            return new IsLong(longValue);
        }
        if(DateTime.TryParse(value, out var dateTimeValue))
        {
            return new IsDate(dateTimeValue);
        }
        return new IsString(value);
    }

}
