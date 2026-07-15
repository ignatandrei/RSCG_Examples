
using TinyBDD.MSTest;

namespace TestClock;

public class MyClock : IMyClock
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

[TestClass]
public partial class TestData:  TinyBddMsTestBase
{
    [TestMethod]
    public async Task TestMyClock()
    {
        
        await Given("start", () => new MyClock())
            .When("get now", x => x.GetNow())
            .Then("equals 84", x => DateTime.Now>=x)
            .AssertPassed();
    }
}


