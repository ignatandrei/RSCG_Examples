
namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var expectations = new TestMock();
        //expectations.Methods().GetNow().Returns(DateTime.Now.AddYears(-1));

        //var mock = expectations.Instance();
        //var data = mock.GetNow();
        //Assert.AreEqual(DateTime.Now.Year - 1, data.Year);
        //expectations.Verify();
    }
}