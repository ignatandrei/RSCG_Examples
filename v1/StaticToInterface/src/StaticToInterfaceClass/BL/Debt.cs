using System;

namespace BL
{
    public class DebtDI
    {
        private readonly ISystem_DateTime dateTime;

        public DebtDI(ISystem_DateTime dateTime)
        {
            this.dateTime = dateTime;
        }
        public DateTime DateOfDebt { get; set; }
        public int MaxNrMonthsForReturningDebt { get; set; }
        public int DebtValue { get; set; }
        public DebtEnum DebtStatus()
        {
            if (DebtValue <= 0)
                return DebtEnum.NoDebt;

            if (DateOfDebt.AddMonths(MaxNrMonthsForReturningDebt).Date >= dateTime.Now.Date)
                return DebtEnum.HasDebt;

            return DebtEnum.DebtInFault;
        }
    }

    public class Debt
    {
        public DateTime DateOfDebt { get; set; }
        public int NrMonthDebt { get; set; }
        public int DebtValue { get; set; }
        public DebtEnum DebtStatus()
        {
            if (DebtValue <= 0)
                return DebtEnum.NoDebt;

            if (DateOfDebt.AddMonths(NrMonthDebt).Date <= DateTime.Now.Date)
                return DebtEnum.HasDebt;

            return DebtEnum.DebtInFault;
        }
    }
}
