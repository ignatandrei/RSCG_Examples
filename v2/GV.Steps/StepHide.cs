namespace  GV.Steps;
[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal record StepHide(string text, string value) : newStep(text, value)
{
    public override void Dispose()
    {
    }

    public override void InitDefaults()
    {
        this.SpeakTest = "";
    }

    public override Task Execute()
    {
        return Task.CompletedTask;
    }
}
