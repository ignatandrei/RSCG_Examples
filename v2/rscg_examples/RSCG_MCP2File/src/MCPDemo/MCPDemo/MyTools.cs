using ModelContextProtocol.Server;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MCPDemo;
[MCP2File.AddMCPExportToFile()]
partial class MyTools
{
    [McpServerTool]
    [Description("Echo demo")]
    public async Task<string> SendEcho([Description("echo")] string echoData)
    {
        await Task.Delay(10);
        return echoData;
    }

}
