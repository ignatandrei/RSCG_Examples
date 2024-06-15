using InjectDemo;
MyServiceProvider sc = new();
//var con = sc.GetService<DatabaseCon>();
//var db = sc.GetService<IDatabase>();
//db.Open();


[Depso.ServiceProvider]
public partial class MyServiceProvider
{
    private void RegisterServices()
    {
        AddTransient<IDatabase, DatabaseCon>();
    }
}