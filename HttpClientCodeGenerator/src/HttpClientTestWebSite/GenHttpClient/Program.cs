using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
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
                var w = await userService.GetAllWeather();
                Console.WriteLine($"{w.First().Summary}");
            }
        }
    }

    public partial class WeatherService
    {
       [HttpGet("WeatherForecast/{id}")]
       public partial Task<WeatherForecast> GetWeather(int id);

        [HttpPost("WeatherForecast")]
        public partial Task<WeatherForecast[]> GetAllWeather();
    }
}
