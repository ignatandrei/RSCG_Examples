namespace MockData;

public class IMyClock
{
    public DateTime MyNow { get; set; } = DateTime.Now;
    //public DateTime GetNow()=>DateTime.Now;
    public DateTime GetUtcNow()=>DateTime.UtcNow;
}