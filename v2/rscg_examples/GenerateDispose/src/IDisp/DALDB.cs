
namespace IDisposableGeneratorDemo;

[GenerateDispose.SourceGenerators.GenerateDispose(nameof(Drop))]
partial class DALDB :IDisposable
{
    private ConnectionDB cn;
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }
    
    public void Drop()
    {
        cn.Dispose();
        cn1.Dispose();
    }
}
