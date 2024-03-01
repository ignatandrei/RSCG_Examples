using AutoAdd;

RemoteCollection rc=new();
foreach(var item in rc.loaders)
{
    item.Execute();
}
