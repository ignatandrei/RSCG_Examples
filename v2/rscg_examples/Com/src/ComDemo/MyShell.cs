﻿using System;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.Marshalling;

namespace test;

// Import the ShellExecute function from Shell32.dll using ComImport
[ComImport]
[Guid("00000000-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public interface IUnknown
{
    void QueryInterface(ref Guid riid, out IntPtr ppvObject);
    void AddRef();
    void Release();
}

//[ComImport]
[GeneratedComInterface(StringMarshalling = StringMarshalling.Utf8)]
[Guid("000214F9-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public partial interface IShellExecute
{
    IntPtr ShellExecute(IntPtr hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, int nShowCmd);
}


// Replace this with your actual ShellExecute COM class
public class ShellExecuteClass : IShellExecute
{
    public IntPtr ShellExecute(IntPtr hwnd, string lpOperation, string lpFile, string lpParameters, string lpDirectory, int nShowCmd)
    {
        // Implement the ShellExecute functionality
        return NativeMethods.ShellExecute(hwnd, lpOperation, lpFile, lpParameters, lpDirectory, nShowCmd);
    }
}

// NativeMethods class to import necessary functions from Shell32.dll
static class NativeMethods
{
    [DllImport("shell32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern IntPtr ShellExecute(
        IntPtr hwnd,
        string lpOperation,
        string lpFile,
        string lpParameters,
        string lpDirectory,
        int nShowCmd
    );
}
