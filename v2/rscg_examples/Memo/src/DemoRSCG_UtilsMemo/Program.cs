using DemoRSCG_UtilsMemo;

fibTest f = new();
Console.Write("start calculating, see output");
Console.WriteLine("first time result:" + f.Test());
Console.WriteLine("memo, no output");
Console.WriteLine("second time result:" + f.Test());
var dt = DateTime.Now;
Console.WriteLine("no memo :" + await f.fib(5) );
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));
dt = DateTime.Now;
Console.WriteLine("memo :" + await f.fibonacci(5));
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));
dt = DateTime.Now;
Console.WriteLine("FAST memo :" + await f.fibonacci(5));
Console.WriteLine(" in  " + DateTime.Now.Subtract(dt).TotalSeconds.ToString("0#"));

