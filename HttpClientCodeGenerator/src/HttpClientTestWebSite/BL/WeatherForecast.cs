using System;

namespace BL
{
    public class WeatherForecast
    {
        public WeatherForecast()
        {
            int i = 4;
        }
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        //public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
