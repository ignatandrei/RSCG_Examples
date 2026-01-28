// See https://aka.ms/new-console-template for more information
using IdempotencyDemo;

Console.WriteLine("Hello, World!");
Purchase p=  new Purchase();
var uniq = Guid.NewGuid().ToString("D");
var s= p.PurchaseNow(uniq, "Book1", 20);
Console.WriteLine(s);
s = p.PurchaseNow(uniq, "Book1", 20);
Console.WriteLine(s);