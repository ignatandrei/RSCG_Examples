using System.Drawing;
using System.Runtime.InteropServices;

namespace GeneratorVideo;

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepBrowser(string text, string value) : Step(text,value)
{
    [DllImport("User32.dll")]
    public static extern IntPtr GetDC(IntPtr hwnd);
    [DllImport("User32.dll")]
    public static extern void ReleaseDC(IntPtr hwnd, IntPtr dc);
    private Process? process;
    public override void Dispose()
    {
        if(process != null) {
            Console.WriteLine("disposing " + process.Id);
            process.Kill();
            process.Dispose();
        }
            
    }

    public override async Task Execute()
    {
        await Task.Delay(1000);
        string program = "explorer.exe", args = value;
        Console.WriteLine($"start browser for {args}");
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
