namespace GeneratorVideo;

[System.Runtime.Versioning.SupportedOSPlatform("windows")]
internal abstract record Step(string text, string value):IParsable<Step>, IDisposable
{
    protected internal string? OriginalFileNameFromWhereTheStepIsComing;
    public const string esc = "\u001B";
    public int Number { get; set; }
    public abstract Task Execute();

    public static Step Parse(string s, IFormatProvider? provider)
    {
        if(TryParse(s,provider, out var value))
            return value;
        throw new ArgumentException("cannot parse to step" + s);
    }

    public static bool TryParse([NotNullWhen(true)] string? s, IFormatProvider? provider, [MaybeNullWhen(false)] out Step result)
    {
        ArgumentNullException.ThrowIfNull(s);
        result = default;
        var split=s.Split(esc,StringSplitOptions.RemoveEmptyEntries).ToArray();
        if(split.Length != 2)
            return false;
        var text = split[0];
        var typeAndNr = text.Split("_", StringSplitOptions.RemoveEmptyEntries);
        if(typeAndNr.Length != 3) return false;
        var nr = typeAndNr[1];
        var type = typeAndNr[2];
        if(!int.TryParse(nr,out var index)) return false;
        switch (type)
        {
            case "text":
                result = new StepText(split[0], split[1]);
                break;
            case "exec":
                result=new StepExecuteProgram(split[0], split[1]);
                break;
            case "hide":
                result=new StepHide(split[0], split[1]);
                break;
            case "browser":
                result = new StepBrowser(split[0], split[1]);
                break;
            case "tour":
                result = new StartTourVSCode(split[0], split[1]);
                break;
            default:
                return false;
        }
        result.Number = index;
        return true;
    }

    public abstract void Dispose();
}
