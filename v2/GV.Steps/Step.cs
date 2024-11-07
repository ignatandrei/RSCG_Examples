using System.Diagnostics.CodeAnalysis;
using System.Speech.Synthesis;

namespace GV.Steps;

public class Step
{
    public string typeStep { get; set; } = string.Empty;
    public string arg { get; set; } = string.Empty;
    public long DurationSeconds { get; set; } = 0;
    public string SpeakTest { get; set; }=string.Empty;
}
[System.Runtime.Versioning.SupportedOSPlatform("windows")]
public abstract record newStep(string typeScript, string arg):IParsable<newStep>, IDisposable
{
    public string? OriginalFileNameFromWhereTheStepIsComing;
    public const string esc = "\u001B";
    public int Number { get; set; }
    internal abstract Task Execute();
    public async Task ExecuteAndSpeak()
    {
        await Task.WhenAll(Talk(true), Execute());
    }
    public abstract Task<bool> InitDefaults();
    public string Description => this.GetType().Name + " " + typeScript + " " + arg;

    public long DurationSeconds { get; set; }
    public string? SpeakTest { get; set; } = null;
    internal async Task Talk(bool speak)
    {
        if (!speak)
        {
            return;
        }
        if(string.IsNullOrWhiteSpace(SpeakTest))
            return;
        Console.WriteLine("TALK:"+SpeakTest);
        using SpeechSynthesizer synth = new();

        var stream = synth.SpeakAsync(SpeakTest);
        while(!stream.IsCompleted)
        {
            await Task.Delay(1000);
        }
        
    }
    public static newStep Parse(string s, IFormatProvider? provider)
    {
        if(TryParse(s,provider, out var value))
            return value;
        throw new ArgumentException("cannot parse to step" + s);
    }

    public static bool TryParse([NotNullWhen(true)] string? s, IFormatProvider? provider, [MaybeNullWhen(false)] out newStep result)
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
            case "showproj":
                result = new StartProjectVSCode(split[0], split[1]);
                break;
            case "waitseconds":
                result = new StepWaitSeconds(split[0], split[1]);
                break;
            case "stepvscode":
                result = new StepVSCode(split[0], split[1]);
                break;

            default:
                return false;
        }
        result.Number = index;
        return true;
    }

    public abstract void Dispose();
}
