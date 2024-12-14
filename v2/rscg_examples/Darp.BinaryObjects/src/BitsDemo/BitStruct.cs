using Darp.BinaryObjects;
using System.IO.Compression;

namespace BitsDemo;

[BinaryObject]
partial record zlib_header(byte cmf, byte flg)
{
    
}