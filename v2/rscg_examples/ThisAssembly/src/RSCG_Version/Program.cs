using System;

namespace RSCG_Version
{
    class Program
    {
        static void Main(string[] args)
        {
            var strVersion = ThisAssembly.Info.Version;
            Console.WriteLine(strVersion);

        }
    }
}
