var disc10Percent = Partially.Apply(Accounting.Discount, 1/10f);
Console.WriteLine(disc10Percent(disc10Percent(100)));