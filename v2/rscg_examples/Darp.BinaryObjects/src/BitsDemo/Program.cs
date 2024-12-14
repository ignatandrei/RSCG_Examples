using BitsDemo;
using Darp.BinaryObjects;

var z = new zlib_header(0x78, 0x9C);

var size = z.GetByteCount();

// Write the values back to a buffer
var writeBuffer = new byte[size];
if(z.TryWriteLittleEndian(writeBuffer))
{
    Console.WriteLine("writing to buffer" );
	foreach (var item in writeBuffer)
	{
		Console.Write(item+" ");
	}
}
