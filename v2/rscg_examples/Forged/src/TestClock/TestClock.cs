

using Forged.Core;

namespace MockData
{
    [Faker<IMyClock>]
    public partial class QuickStartRepoStub { }
}

namespace TestClock
{


    [TestClass]
    public class TestClock
    {
        [TestMethod]
        public void TestMyClock()
        {
            
            var expectations = new QuickStartRepoStub()
            {

                MyNow = f => f.Temporal.Past(DateTime.Now.AddYears(-1))
            };
            //expectations.MyNow =()=>(DateTime.Now.AddYears(-1));

            IMyClock mock = expectations.Get();
            var data= mock.MyNow;
            Assert.AreEqual(DateTime.Now.Year -1, data.Year);

        }
    }

}

