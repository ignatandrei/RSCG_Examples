SimpleCoffee s = new SimpleCoffee();
Console.WriteLine(s.Description +" with Price "+ s.Price);
ICoffee withMilk = new MilkDecorator(s);
Console.WriteLine(withMilk.Description} +" with Price "+ withMilk.Price);
ICoffee withMilkAndChoco = new ChocoDecorator(withMilk);
Console.WriteLine(withMilkAndChoco.Description +" with Price "+ withMilkAndChoco.Price);