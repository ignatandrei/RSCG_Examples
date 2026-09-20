using EmbedDemo;
using System.Globalization;

Console.WriteLine("Hello, World!");

TranslateAllText.SetCulture(new CultureInfo("en-US"));
Console.WriteLine(TranslateAllText.Instance.Root.Page1.MyText);

TranslateAllText.SetCulture(new CultureInfo("ro-RO")    );
Console.WriteLine(TranslateAllText.Instance.Root.Page1.MyText);
