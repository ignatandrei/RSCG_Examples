
using Mocklis;

namespace TestClock;

[TestClass]
public class TestClock
{
    [TestMethod]
    public void TestMyClock()
    {
        var mockSetup = new TestMock();
        mockSetup.GetNow.Return(DateTime.Now.AddYears(-1));

        // When testing the mock like this you need to cast to the interface.
        // This is different from e.g. Moq where the mocked instance and the 'programming interface' are different things.
        // With Mocklis they are the same. The 99% case is where the mock is passed to another constructor as a dependency,
        // in which case there's an implicit cast to the interface.
        var mock = (IMyClock)mockSetup;
        var data = mock.GetNow();
        Assert.AreEqual(DateTime.Now.Year - 1, data.Year);

    }
}