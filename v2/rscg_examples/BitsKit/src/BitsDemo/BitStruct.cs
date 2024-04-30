using BitsKit;
using BitsKit.BitFields;
using System.IO.Compression;

namespace BitsDemo;
//[BitObject(BitOrder.LeastSignificant)]
//partial struct zlib_header
//{
//    public zlib_header(byte cmf, byte flg)
//    {
//        CMF = cmf;
//        FLG = flg;
//    }
//    [EnumField("CM", 4, typeof(CompressionMode))]
//    [BitField("CINFO", 4)]
//    private byte CMF;

//    [BitField("FCHECK", 5)]
//    [BooleanField("FDICT")]
//    [EnumField("FLEVEL", 2, typeof(CompressionLevel))]
//    private byte FLG;
//}

[BitObject(BitOrder.LeastSignificant)]
partial struct zlib_header
{
    public zlib_header(byte cmf, byte flg)
    {
        CMF = cmf;
        FLG = flg;
    }

    [BitField("CM", 4)]
    [BitField("CINFO", 4)]
    private byte CMF;

    [BitField("FCHECK", 5)]
    [BitField("FDICT", 1)]
    [BitField("FLEVEL", 2)]
    private byte FLG;
}