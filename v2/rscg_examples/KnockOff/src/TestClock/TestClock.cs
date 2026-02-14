
using KnockOff;

namespace TestClock;

[KnockOff]
public partial class QuickStartRepoStub : IMyClock { }


[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var expectations = new QuickStartRepoStub();
        expectations.GetNow.Return(DateTime.Now.AddYears(-1));
        
        IMyClock mock = expectations;
        var data= mock.GetNow();
        Assert.AreEqual(DateTime.Now.Year -1, data.Year);
        expectations.Verify();
    }
}


