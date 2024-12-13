// See https://aka.ms/new-console-template for more information

Console.WriteLine("Hello, World!");
var p= Product.GetProduct(new SqlConnection("Server=localhost;Database=AdventureWorks2019;Trusted_Connection=True;"), 1);