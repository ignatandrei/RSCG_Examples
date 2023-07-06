

using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace TestBlazor.Pages;

[SupportedOSPlatform("browser")]
public partial class CallJavaScript1
{
    [JSImport("getMessage", "CallJavaScript1")]
    internal static partial string GetWelcomeMessage(string s);
    [JSExport]
    internal static string GetMessageFromDotnet(string s)
    {
        return " GetMessageFromDotnet  => " +  s;
    }
}