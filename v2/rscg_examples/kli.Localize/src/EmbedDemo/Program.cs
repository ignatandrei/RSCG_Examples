using EmbedDemo.TestData;
using System.Globalization;
using System.Text;

Console.WriteLine("Hello, World!");
CultureInfo.CurrentUICulture  = new CultureInfo("en-US");
Console.WriteLine(AllText.Welcome);
CultureInfo.CurrentUICulture  = new CultureInfo("ro-RO");
Console.WriteLine(AllText.Welcome);
Console.WriteLine(AllText.page1.Text);