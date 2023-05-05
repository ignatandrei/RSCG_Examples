using MatOps;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace OpsTest
{
    [TestClass]
    public class TestCalculator
    {
        [TestMethod]
        public void TestCalculatorCorrect()
        {
            var mock = (IMatOps)new MatOpsMock
            {
                MockAdd = (a, b) => a+b,
                MockDivision = (a,b)=> a/b
            };
            var calc = new CalculatorInt(mock);
            var c= calc.Calculate(1, new Data[]
            {
                new Data()
                {
                    a=1,
                    Operation= Operation.Add
                }
            });
            Assert.AreEqual(2, c);
            
        }
    }
    
}
