using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace test;

[INotifyPropertyChanged]
public partial class MyViewModel 
{
    [ObservableProperty]
    private string? name;

    [RelayCommand]
    private void SayHello()
    {
        Console.WriteLine("Hello");
    }
}
