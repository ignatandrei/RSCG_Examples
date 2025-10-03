var app = ConsoleAppFramework.ConsoleApp.Create();

app.Add("", (string msg) => Console.WriteLine(msg));
app.Add("echo", (string msg) => Console.WriteLine(msg));
app.Add("sum", (int x, int y) => Console.WriteLine(x + y));

// --help
// --msg Andrei
// echo --msg Andrei
// sum --x 55 --y 0
app.Run(args);