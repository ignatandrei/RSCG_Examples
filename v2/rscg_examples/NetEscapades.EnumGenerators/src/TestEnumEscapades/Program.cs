
var value = InstallType.ShowGUI;
Console.WriteLine($"the enum string is {value.ToStringFast()}");
Console.WriteLine($"{InstallType.None.ToStringFast()}");


var flags = AddToCoffee.Milk | AddToCoffee.Sugar;

Console.WriteLine(flags.ToStringFast());
Console.WriteLine($"HasFlag(Milk), {flags.HasFlagFast(AddToCoffee.Milk)}");
Console.WriteLine($"HasFlag(Biscuit), {flags.HasFlagFast(AddToCoffee.Biscuit)}");
//check also
//InstallTypeExtensions.GetNames
//AddToCoffeeExtensions.GetNames