﻿// See https://github.com/domn1995/dunet for more examples
using duneDemo;
Console.WriteLine(WhatIsTheString.FromString("1"));

Console.WriteLine(WhatIsTheString.FromString("Andrei"));

Console.WriteLine(WhatIsTheString.FromString("1970-04-16"));

Console.WriteLine("Enter something - 1, 1970-04-16 or Andrei !");
var readLine = Console.ReadLine();
var opt= WhatIsTheString.FromString(readLine);
Console.WriteLine(opt);
//if if it long
opt.MatchIsLong(
    l => Console.WriteLine("is long " + l.value),
    () => Console.WriteLine("is not long")
    ) ;
//C# switch
var x=opt switch
{
    WhatIsTheString.IsLong l => "is long " +l.value,
    WhatIsTheString.IsDate d=> "is date "+ d.value,
    WhatIsTheString.IsString s=>"is string "+ s.value,
    WhatIsTheString.IsNullWhiteSpace w=>"no data",
    _ => throw new NotImplementedException()

};
Console.WriteLine(x);




