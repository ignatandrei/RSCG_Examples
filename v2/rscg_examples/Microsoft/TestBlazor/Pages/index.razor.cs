

using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace TestBlazor.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    //Generator:JSImports.g.cs
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage(string s);
    //Generator:JSExports.g.cs
    [JSExport]
    internal static string GetMessageFromDotnet(string s)
    {
        return " GetMessageFromDotnet  => " +  s;
    }
}