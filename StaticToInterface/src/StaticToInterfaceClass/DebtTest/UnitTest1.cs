using BL;
using System;
using System.Threading.Tasks;
using Xunit;

namespace DebtTest
{
    public class UnitTest1
    {
        [Fact]
        public void TestDebtIsNoPaid()
        {
            #region arrange
            var d = new Debt();
            d.DebtValue = 100;
            d.NrMonthDebt = 4;
            d.DateOfDebt = DateTime.Now.Date.AddMonths(-d.NrMonthDebt + 1);
            #endregion
            #region assert
            Assert.Equal(DebtEnum.DebtInFault, d.DebtStatus());
            #endregion
        }

        [Fact]
        public void TestDebtIsNoPaidWithDI()
        {
            #region arrange
            var nrMonthDebt = 5;
            //testing each month
            var dateOfDebt = DateTime.Now.AddMonths(-nrMonthDebt); ;
            var newDate = dateOfDebt;
            while (newDate < DateTime.Now.AddDays(-1))
            {
                newDate = newDate.AddDays(1);
                var dateDebt = new clsISystem_DateTime(newDate, default, default);
                var d = new DebtDI(dateDebt);
                d.DebtValue = 100;
                d.MaxNrMonthsForReturningDebt = nrMonthDebt;
                d.DateOfDebt = dateOfDebt;
                #endregion
                #region assert
                Assert.Equal(DebtEnum.HasDebt, d.DebtStatus());
                #endregion
            }

        }
    }
}