
namespace AutoAdd;
partial class RemoteCollection
{
    public List<IRemoteCommand> loaders = new ();

    public RemoteCollection()
    {
        LoadLoaders();
    }
    [AutoInvoke.FindAndInvoke]
    public void LoadLoaders<T>() where T : IRemoteCommand,new()
    {
        loaders.Add(new T());
    }
    
}
