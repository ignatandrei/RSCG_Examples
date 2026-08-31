

namespace TestClock;

[TDoubles.Mock(typeof(IMyClock))]
public partial class QuickStartRepoStub { }


[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var expectations = new QuickStartRepoStub();
        expectations.MockOverrides.GetNow =()=>(DateTime.Now.AddYears(-1));
        
        IMyClock mock = expectations;
        var data= mock.GetNow();
        Assert.AreEqual(DateTime.Now.Year -1, data.Year);
        
    }
}


