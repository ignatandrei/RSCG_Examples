namespace StringLiteralDemo;

partial class LiteralConstants
{
    [StringLiteral.Utf8Attribute("Andrei Ignat")]
    public static partial System.ReadOnlySpan<byte> MyName();
}
