// See https://aka.ms/new-console-template for more information
using RxDemo;
using RxMethodGenerator;

Console.WriteLine("Hello, World!");
Person p=new Person();
//p.ActionEvent+= (a,b,c)=>
//{
//    Console.WriteLine($"Into Event:{a},{b},{c}");
//};
p.RxActionEvent().Subscribe(t=>
{
    Console.WriteLine($"into rx {t.Item1Int32},{t.Item2String},{t.Item3Boolean}");
});

p.DoAction(1,"2",true);
Console.ReadLine();