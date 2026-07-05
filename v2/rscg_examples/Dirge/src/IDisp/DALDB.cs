namespace IDisposableGeneratorDemo;

[Dirge.AutoDispose]
partial class DALDB 
{
    private ConnectionDB cn;
    private ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

}
