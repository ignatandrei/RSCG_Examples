namespace MockData;

public class MyClock
{
    public DateTime GetNow()
    {
        return DateTime.Now;
    }
    public DateTime GetUtcNow()
    {
        return DateTime.UtcNow;
    }
}