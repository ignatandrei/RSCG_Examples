
using MockMe;

namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var mock = Mock.Me(default(MyClock));
        mock.Setup.GetUtcNow().Returns(DateTime.Now.AddYears(-1));
        mock.Setup.GetNow().Returns(DateTime.Now.AddYears(-1));
        MyClock clock = mock;
        Assert.AreEqual(DateTime.Now.AddYears(-1).Year, clock.GetNow().Year);
    }
}