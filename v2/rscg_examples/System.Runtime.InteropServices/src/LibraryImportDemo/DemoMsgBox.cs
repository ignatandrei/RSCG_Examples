
partial class DemoImport
{
    [DllImport("user32.dll", EntryPoint = "MessageBoxW", CharSet = CharSet.Unicode, SetLastError = true)]

    internal static extern int MessageBoxW(IntPtr hWnd, string lpText, string lpCaption, uint uType);


    [LibraryImport("user32.dll", EntryPoint = "MessageBoxW", SetLastError = true,
StringMarshalling = StringMarshalling.Utf16)]

    internal static partial int MessageBoxW_LI(IntPtr hWnd, string lpText, string lpCaption, uint uType);
}