namespace  GV.Steps;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepHide(string text, string value) : newStep(text, value)
{
    public override void Dispose()
    {
    }

    public override Task<bool> InitDefaults()
    {
        this.SpeakTest ??= "";
        return Task.FromResult(true);
    }

    internal override Task Execute()
    {
        return Task.CompletedTask;
    }
}
