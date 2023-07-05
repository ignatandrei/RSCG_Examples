using System.Text.RegularExpressions;

namespace Demo;

public partial class DemoRegex
{
    //Generator:RegexGenerator.g.cs
    [GeneratedRegex("abc|def", RegexOptions.IgnoreCase, "en-US")]
    private static partial Regex AbcOrDefGeneratedRegex();

    public static bool EvaluateText(string text)
    {
        return (AbcOrDefGeneratedRegex().IsMatch(text));
        
    }
}
