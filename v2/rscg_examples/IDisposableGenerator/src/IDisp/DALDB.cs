﻿namespace IDisposableGeneratorDemo;

[GenerateDispose(true)]
partial class DALDB :IDisposable
{
    [DisposeField(true)]
    private readonly ConnectionDB cn;
    [DisposeField(true)] 
    private readonly ConnectionDB cn1;

    public DALDB()
    {
        cn = new ConnectionDB();
        cn1=new ConnectionDB();
    }
}