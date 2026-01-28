using System;
using System.Collections.Generic;
using System.Text;

namespace IdempotencyDemo;

internal partial class Purchase
{
    public bool PurchaseNow([RSCG_IdemPotency.Idempotent]string UniqueId, string idProduct,int quantity)
    {
        if(PurchaseNow_ExistsBefore(UniqueId))
            return false;

        Console.WriteLine($"bought ! ");
        return true;
    }
}
