
using MockData;
namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var mock = new IMyClockImposter();
        mock.GetUtcNow().Returns(DateTime.Now.AddYears(-1));
        mock.GetNow().Returns(DateTime.Now.AddYears(-1));
        IMyClock clock = mock.Instance();
        Assert.AreEqual(DateTime.Now.AddYears(-1).Year, clock.GetNow().Year);
    }
}