using RSCG_StaticDemo;
//for DI, register
//ISystem_DateTime  with transient for new clsSystem_DateTime()
Console.WriteLine("Hello World!");
ISystem_DateTime dateStatic = recSystem_DateTime.MakeNew();//static
ISystem_DateTime dateVar = new clsSystem_DateTime(); //variable = real 

Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
await Task.Delay(10 * 1000);
Console.WriteLine(dateStatic.Now.Second);
Console.WriteLine(dateVar.Now.Second);
