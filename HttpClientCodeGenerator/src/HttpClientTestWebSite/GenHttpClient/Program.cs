using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BL;
using HttpClientGenerator.Shared;

namespace GenHttpClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:5000");
                var userService = new WeatherService(client);
                var w = await userService.GetWeather(1);
                Console.WriteLine($"{w.Summary}");
                var q = await userService.GetAllWeather();
                Console.WriteLine($"{q[0].Summary}");
            }
        }
    }

    public partial class WeatherService
    {
       [HttpGet("WeatherForecast/{id}")]
       public partial Task<WeatherForecast> GetWeather(int id);

        [HttpGet("WeatherForecast")]
        public partial Task<WeatherForecast[]> GetAllWeather();
    }
}
