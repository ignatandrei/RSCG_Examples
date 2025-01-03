﻿using System;
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
            try
            {
                string folder = @"C:\Users\Surface1\Documents\GitHub\RSCG_Examples";
                var m = new MultiGenerator(folder);
                await m.GeneratePost();
                await m.GenerateReadMeForEach();
                await m.GenerateFrontReadMe();
                await m.GenerateForImages(Path.Combine(folder, "docs", "images"));
                await m.GenerateForEmail();
            }
            catch(Exception ex)
            {
                Console.WriteLine("!!!!" + ex.Message);
            }
        }
        
        
        
    }
}
