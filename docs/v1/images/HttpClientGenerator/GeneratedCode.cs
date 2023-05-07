public partial async System.Threading.Tasks.Task<BL.WeatherForecast> GetWeather(int id)
{
    const string @___httpMethod = 
GET
;
    
    var @___path = 
WeatherForecast/{id}
;
    var @___routes = new Dictionary<string, object>();
    @___routes[
id
] = id;
    
    var @___queryParams = new Dictionary<string, object>();
    // Query String dictionary goes here...
    
    var @___headers = new Dictionary<string, string>();
    // Header dictionary goes here...
    
    return await HttpClientGenerator.Shared.HttpClientHelper.SendAsync<BL.WeatherForecast>(_httpClient, @___httpMethod, @___path, @___headers, @___routes, @___queryParams);
}