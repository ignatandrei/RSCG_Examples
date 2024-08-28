namespace GeneratorVideo;
internal record StepWaitSeconds(string text,string value): Step(text, value)
{
    public override async Task Execute()
    {
        var nr = int.Parse(value);
        await Task.Delay(nr*100);
    }
    public override void Dispose()
    {
    }
}
