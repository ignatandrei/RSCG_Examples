using Microsoft.Extensions.DependencyInjection;
using test;
/*Visual Studio version	Azurite executable location
Visual Studio Community 2022	C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
Visual Studio Professional 2022	C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
Visual Studio Enterprise 2022	C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
*/

var serviceProvider = new ServiceCollection()
    .AddDatabaseContext("UseDevelopmentStorage=true")
    .BuildServiceProvider();

DatabaseContext db = serviceProvider.GetRequiredService<DatabaseContext>();

Employee?  e=new ();
e.Name = "Andrei Ignat";
e.PartitionKey = "1";
e.RowKey = Guid.NewGuid().ToString();
await db.Employees.AddEntityAsync(e);

e = await db.Employees.GetEntityAsync(e.PartitionKey, e.RowKey);
Console.WriteLine(e?.Name);  
