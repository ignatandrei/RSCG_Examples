using InjectDemo;
using Pure.DI;


DI.Setup("Composition")
    .Bind<IDatabase>().To<DatabaseCon>()
    .Bind<Database>().To<Database>()
    .Root<Database>();
    ;

var c = new Composition();
var con = c.Resolve<Database>();
con.Open();




