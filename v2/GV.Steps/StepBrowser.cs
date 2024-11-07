using System.Diagnostics;
using System.Drawing;
using System.Runtime.InteropServices;
using WindowsInput;
using WindowsInput.Native;

namespace  GV.Steps;

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepBrowser(string text, string value) : newStep(text,value)
{
    
    //[DllImport("User32.dll")]
    //public static extern IntPtr GetDC(IntPtr hwnd);
    //[DllImport("User32.dll")]
    //public static extern void ReleaseDC(IntPtr hwnd, IntPtr dc);
    private Process? process;
    public override void Dispose()
    {
        if(process != null) {
            //Console.WriteLine("disposing " + process.Id);
            process.Kill(true);
            process.Dispose();
        }
            
    }
    public override async Task<bool> InitDefaults()
    {
        string Title = await GetPageTitle();
        this.SpeakTest ??= "Now I will show you "+ Title;
        return true;
    }
    static HttpClient client = new();
    private async Task<string> GetPageTitle()
    {
        var req= await client.GetAsync(value);
        req.EnsureSuccessStatusCode();
        var content = await req.Content.ReadAsStringAsync();
        var start = content.IndexOf("<title") + 4;
        var end = content.IndexOf("</title>");
        content= content.Substring(start, end - start);
        while(!content.StartsWith(">"))
            content = content.Substring(1);
        content= content.Substring(1);
        start = content.IndexOf("|");
        
        if (start > 0)
            content = content.Substring(start+1).Trim();

        return content;
    }
    internal override async Task Execute()
    {
        await Task.Delay(1000);
        string program = "explorer.exe", args = value;
        Console.WriteLine($"start browser for {args}");
        InputSimulator inputSimulator = new InputSimulator();
        inputSimulator.Mouse.MoveMouseTo(5000, 25000);
        await Task.Delay(1000);
        //inputSimulator.Keyboard.ModifiedKeyStroke(VirtualKeyCode.LWIN, VirtualKeyCode.VK_M);
        //await Task.Delay(1000);
        inputSimulator.Keyboard.ModifiedKeyStroke(VirtualKeyCode.CONTROL, VirtualKeyCode.VK_2);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.VK_T);
        await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyPress(VirtualKeyCode.DOWN);
        //await Task.Delay(1000);
        inputSimulator.Keyboard.TextEntry(args); 
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.ESCAPE);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.ESCAPE);

        //IntPtr desktopDC = GetDC(IntPtr.Zero);        
        //Graphics g = Graphics.FromHdc(desktopDC); 
        //await Task.Delay(1000);
        //StringFormat sf = new StringFormat();
        //sf.LineAlignment = StringAlignment.Center;
        //sf.Alignment = StringAlignment.Far; 
        //sf.Trimming = StringTrimming.None;
        //g.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAlias; 
        //g.DrawString(args, new Font(FontFamily.GenericSerif, 30), Brushes.Red, 1250, 300,sf);

        //Console.ReadLine();
        process = Process.Start(program, args);
        //g.Dispose();

        //ReleaseDC(desktopDC,IntPtr.Zero);
        return ;
    }
}
