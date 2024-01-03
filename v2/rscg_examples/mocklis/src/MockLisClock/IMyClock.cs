namespace MockTest;

public interface IMyClock
{
    public DateTime GetNow();
    public DateTime GetUtcNow();
}