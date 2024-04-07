// file: UnitTest1.cs
using MyImportantClass;

namespace DemoTest;

[TestClass]
public class UnitTest1
{
    [TestMethod]
    public void TestMethod1()
    {
        Assert.AreEqual(3, new Class1().Add(1, 2));
    }

    [TestMethod]
    [DataRow(1, 2)]
    [DataRow(100, -97)]
    public void TestMethod2(int left, int right)
    {
        Assert.AreEqual(3, new Class1().Add(left, right));
    }
}