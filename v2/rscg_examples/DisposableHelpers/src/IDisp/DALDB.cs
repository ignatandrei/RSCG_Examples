using DisposableHelpers.Attributes;
using System.Resources;

namespace IDisposableGeneratorDemo;


[Disposable]
partial class DALDB 
{
    
    private readonly ConnectionDB cn;
    private readonly ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

    protected void Dispose(bool disposing)
    {
        if (disposing)
        {
            cn.Dispose();
            cn1.Dispose();
        }
    }
}
