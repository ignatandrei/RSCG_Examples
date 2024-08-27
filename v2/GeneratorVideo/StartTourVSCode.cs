
using System.Drawing;
using Windows.Media.AppBroadcasting;
using WindowsInput;
using WindowsInput.Native;
namespace GeneratorVideo;

internal record StepSendKey(string text, string value) : Step(text, value)
{
    public override void Dispose()
    {
    }
    public override async Task Execute()
    {
        await Task.Yield();
    }


}
internal record StartTourVSCode(string text,string value) : StepSendKey(text,value)
{
    public override async Task Execute()
    {
        await Task.Yield();
        InputSimulator inputSimulator = new InputSimulator();
        await Task.Delay(100);

        await ExecuteInVSCodeCommand(inputSimulator, "Explorer: focus on CodeTour View");

        await Task.Delay(100);
        await ExecuteInVSCodeCommand(inputSimulator, "CodeTour:Start Tour");
        await Task.Delay(5000);
        await NextTourStep(inputSimulator);
        await Task.Delay(5000);
        await NextTourStep(inputSimulator);
        //await ExecuteInVSCodeCommand(inputSimulator, "Explorer: focus on CodeTour View");
        //await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyDown(VirtualKeyCode.RIGHT);
        //await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyDown(VirtualKeyCode.RIGHT);
        //await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyDown(VirtualKeyCode.RIGHT);
        //await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyPress(VirtualKeyCode.RETURN);
        ////await Task.Delay(1000);
        //inputSimulator.Keyboard.KeyUp(VirtualKeyCode.CONTROL);

    }
    private async Task<bool> NextTourStep(InputSimulator inputSimulator)
    {
        inputSimulator.Keyboard.KeyDown(VirtualKeyCode.CONTROL);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyPress(VirtualKeyCode.RIGHT);
        await Task.Delay(1000);
        inputSimulator.Keyboard.KeyUp(VirtualKeyCode.CONTROL);
        return true;
    }
    private async Task<bool> ExecuteInVSCodeCommand(InputSimulator inputSimulator,  string text)
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
