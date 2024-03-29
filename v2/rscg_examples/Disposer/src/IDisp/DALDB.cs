﻿namespace IDisposableGeneratorDemo;


[Disposer.Disposable]
partial class DALDB :IDisposable
{
    
    private readonly ConnectionDB cn;
    private readonly ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }

    partial void DisposeManaged()
    {
        cn.Dispose();
        cn1.Dispose();
    }

    partial void DisposeUnmanaged()
    {
        // free Unmanaged resources here
    }
}
