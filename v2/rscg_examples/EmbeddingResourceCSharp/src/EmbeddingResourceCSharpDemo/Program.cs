// See https://aka.ms/new-console-template for more information
using System;
using System.Text;

var value = EmbeddingResourceCSharpDemo.MyResource.GetContentOfCreate();
StringBuilder sb = new ();
foreach (byte b in value)
{
    sb.Append((char)b);
}
;
//EncodingExtensions.GetString(Encoding.UTF8, value);
Console.WriteLine(sb.ToString());
