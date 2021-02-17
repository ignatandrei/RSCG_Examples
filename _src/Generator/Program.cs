using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
namespace Generator
{
    class Program
    {
        static async Task Main(string[] args)
        {

            var m = new MultiGenerator(@"E:\ignatandrei\RSCG_Examples\");
            await m.GeneratePost();
            await m.GenerateReadMeForEach();
            await m.GenerateFrontReadMe();

        }
        
        
        
    }
}
