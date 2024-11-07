namespace GV.Steps;

internal record StartProjectVSCode(string text, string value) : newStep(text, value)
{
    public override void Dispose()
    {
    }
    public override Task<bool> InitDefaults()
    {
        SpeakTest ??= "I am launching now the project " + value;
        return Task.FromResult( true);
    }
    internal override async Task Execute()
    {
        InputSimulator inputSimulator = new InputSimulator();
        StepText stepText = new("text_1_text", "We will have a new clean terminal slate");
        await stepText.Execute();
        await ExecuteInVSCodeCommand(inputSimulator, "Terminal: Kill All Terminals");
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Terminal: Create New Terminal");
        await Task.Delay(1000);
        //await ExecuteInVSCodeCommand(inputSimulator, "Terminal: Focus on terminal view");
        //await Task.Delay(1000);
        //await ExecuteInVSCodeCommand(inputSimulator, "Terminal: Clear");
        //await Task.Delay(1000);
        stepText = new("text_2_text", "We now run the project");
        await stepText.Execute();
        await ExecuteInVSCodeCommand(inputSimulator, "explorer: Focus on Solution Explorer View");
        await Task.Delay(1000);
        //await ExecuteInVSCodeCommand(inputSimulator, "Solution Explorer: Build");
        //await Task.Delay(3000);
        await GotoFile(inputSimulator, value);
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Solution explorer: Select Active Document");
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Terminal: Clear");
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Solution Explorer: Run");
        stepText = new("text_3_text", "You can see in the terminal the result");
        await stepText.Execute();
        await Task.Delay(5000);
        // var width = GetSystemMetrics(SystemMetric.VirtualScreenWidth);
        // var height = GetSystemMetrics(SystemMetric.VirtualScreenHeight);
        // Console.WriteLine($"width={width} height={height}");
        // inputSimulator.Mouse.MoveMouseTo(0, 0);
        // await Task.Delay(1000);
        // inputSimulator.Mouse.MoveMouseBy(width / 2, height / 2);
        // await Task.Delay(1000); 
        // inputSimulator.Mouse.LeftButtonClick();
    }

    public enum SystemMetric
    {
        SM_CXSCREEN = 0,
        SM_CYSCREEN = 1,
        VirtualScreenWidth = 78, // CXVIRTUALSCREEN 0x0000004E 
        VirtualScreenHeight = 79, // CYVIRTUALSCREEN 0x0000004F 
    }

    [DllImport("user32.dll")]
    public static extern int GetSystemMetrics(SystemMetric metric);
    private async Task<bool> GotoFile(InputSimulator inputSimulator, string text)
    {
        inputSimulator.Keyboard.KeyDown(VirtualKeyCode.CONTROL);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.VK_P);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyUp(VirtualKeyCode.CONTROL);
        await Task.Delay(1000);
        inputSimulator.Keyboard.TextEntry(text);
        await Task.Delay(3000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.RETURN);
        return true;
    }
    private async Task<bool> ExecuteInVSCodeCommand(InputSimulator inputSimulator, string text)
    {
        inputSimulator.Keyboard.KeyDown(VirtualKeyCode.CONTROL);
        inputSimulator.Keyboard.KeyDown(VirtualKeyCode.SHIFT);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.VK_P);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyUp(VirtualKeyCode.SHIFT);
        inputSimulator.Keyboard.KeyUp(VirtualKeyCode.CONTROL);
        await Task.Delay(1000);
        inputSimulator.Keyboard.TextEntry(text);
        await Task.Delay(3000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.RETURN);
        return true;
    }

}