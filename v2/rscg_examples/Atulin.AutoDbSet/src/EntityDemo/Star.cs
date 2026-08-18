namespace Stats.Database;

[AutoDbSetGenerators.AutoDbSet]
public partial class Star
{
    public long Id { get; set; }

    public long Idproject { get; set; }

    public int Count { get; set; }

    public DateOnly DateRecording { get; set; }
}
