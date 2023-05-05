using (var client = new HttpClient())                              
{
    client.BaseAddress = new Uri(
http://localhost:5000
);
    var userService = new WeatherService(client);
    var w = await userService.GetWeather(1);
    Console.WriteLine($
{w.Summary}
);
    var q = await userService.GetAllWeather();
    Console.WriteLine($
{q[0].Summary}
);
}