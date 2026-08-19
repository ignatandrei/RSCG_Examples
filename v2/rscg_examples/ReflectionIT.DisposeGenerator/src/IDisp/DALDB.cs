using ReflectionIT.DisposeGenerator.Attributes;

namespace IDisposableGeneratorDemo;

[Disposable]
partial class DALDB :IDisposable
{
    [Dispose]
    private ConnectionDB cn;
    [Dispose] 
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

}
