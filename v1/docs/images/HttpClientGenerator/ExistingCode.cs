public partial class WeatherService
{
   [HttpGet(
WeatherForecast/{id}
)]
   public partial Task<WeatherForecast> GetWeather(int id);

    [HttpGet(
WeatherForecast
)]
    public partial Task<WeatherForecast[]> GetAllWeather();  
}