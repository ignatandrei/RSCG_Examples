namespace GV.Steps;
internal record StartTourVSCode(string text, string value) : newStep(text, value)
{
    public override Task<bool> InitDefaults()
    {
        this.SpeakTest ??= "I am now going to show you the more relevant codes ";
        return Task.FromResult(true);
    }
    internal override async Task Execute()
    {
        ArgumentNullException.ThrowIfNullOrWhiteSpace(base.OriginalFileNameFromWhereTheStepIsComing);
        var folderWithTours = Path.Combine(Path.GetDirectoryName(base.OriginalFileNameFromWhereTheStepIsComing)!, value);
        var tourFiles = Directory.GetFiles(folderWithTours, "*.tour");
        if (tourFiles.Length != 1)
        {
            throw new FileNotFoundException("must found 1 file in " + folderWithTours);
        }
        var tourData = await File.ReadAllTextAsync(tourFiles[0]);
        var data = JsonDocument.Parse(tourData);
        var steps = data.RootElement.GetProperty("steps");
        var nrSteps = steps.GetArrayLength();

        await Task.Yield();
        InputSimulator inputSimulator = new InputSimulator();
        //await Task.Delay(100);

        //await ExecuteInVSCodeCommand(inputSimulator, "Explorer: focus on CodeTour View");
        await Task.Delay(100);
        await ExecuteInVSCodeCommand(inputSimulator, "view :close all editors");
        await Task.Delay(100);
        await ExecuteInVSCodeCommand(inputSimulator, "CodeTour:Start Tour");
        await Task.Delay(5000);
        Console.WriteLine("nr steps " + nrSteps);
        for (var i = 0; i < nrSteps - 1; i++)
        {
            Console.WriteLine($"step {i+1} / {nrSteps} ");
            await NextTourStep(inputSimulator);
            await Task.Delay(10_000);
            //Console.ReadLine();
        }

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

    public override void Dispose()
    {

    }
}
