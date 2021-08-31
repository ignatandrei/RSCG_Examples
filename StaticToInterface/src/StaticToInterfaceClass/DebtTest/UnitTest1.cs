using BL;
using System;
using System.Threading.Tasks;
using Xunit;

namespace DebtTest
{
    public class UnitTest1
    {
        [Fact]
        public async Task TestDebtIsNoPaid()
        {
            #region arrange
            var d = new Debt();
            d.DebtValue = 100;
            d.NrMonthDebt = 5;
            d.DateOfDebt = DateTime.Now.Date.AddDays(1).AddMonths(-1);
            await Task.Delay(2*1000);
            #endregion
            #region assert
            Assert.Equal(DebtEnum.DebtInFault, d.DebtStatus());
            #endregion
        }

        [Fact]
        public void TestDebtIsNoPaidDI()
        {
            #region arrange
            var nrMonthDebt = 5;
            var dateDebt = new clsISystem_DateTime(DateTime.Now.AddMonths(-nrMonthDebt), default, default);
            var d = new DebtDI(dateDebt);
            d.DebtValue = 100;
            d.NrMonthDebt = nrMonthDebt;
            d.DateOfDebt = DateTime.Now;
            #endregion
            #region assert
            Assert.Equal(DebtEnum.DebtInFault, d.DebtStatus());
            #endregion
        }
    }
}
