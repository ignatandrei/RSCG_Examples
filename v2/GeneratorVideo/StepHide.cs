namespace GeneratorVideo;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepHide(string text, string value) : Step(text, value)
{
    public override Task Execute()
    {
        return Task.CompletedTask;
    }
}
