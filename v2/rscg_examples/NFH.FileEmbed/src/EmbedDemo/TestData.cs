using FileEmbed;

namespace EmbedDemo;

public static partial class TestData
{
    [FileEmbed(@"TestData\Countries.txt")]
    public static partial ReadOnlySpan<byte> Countries();
}
