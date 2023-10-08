namespace IDisposableGeneratorDemo;

[IDisposableGenerator.GenerateDispose(false)]
partial class DALDB :IDisposable
{
    [IDisposableGenerator.DisposeField(true)]
    private ConnectionDB cn;
    [IDisposableGenerator.DisposeField(true)] 
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

}
