using WindowsInput;
using WindowsInput.Native;
namespace GeneratorVideo;

internal record StartProjectVSCode(string text, string value) : Step(text, value)
{
    public override void Dispose()
    {
    }

    public override async Task Execute()
    {
        InputSimulator inputSimulator = new InputSimulator();
        await Task.Delay(100);
        await ExecuteInVSCodeCommand(inputSimulator, "explorer: Focus on Solution Explorer View");
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Solution Explorer: Build");
        await Task.Delay(3000);
        await GotoFile(inputSimulator, value);
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Solution explorer: Select Active Document");
        await Task.Delay(1000);
        await ExecuteInVSCodeCommand(inputSimulator, "Solution Explorer: Run");
    }
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
