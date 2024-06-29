using InjectDemo;
MyServiceProvider sc = new();
var con = sc.GetService(typeof(Database)) as IDatabase;
ArgumentNullException.ThrowIfNull(con);
con.Open();


[Depso.ServiceProvider]
public partial class MyServiceProvider
{
    private void RegisterServices()
    {
        AddTransient<Database, Database>();
        AddTransient<IDatabase, DatabaseCon>();
    }
}