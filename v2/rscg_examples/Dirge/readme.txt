
# Dirge

[![Test](https://github.com/IkuzakIkuzok/Dirge/actions/workflows/Test.yml/badge.svg)](https://github.com/IkuzakIkuzok/Dirge/actions/workflows/Test.yml)
[![Version](https://img.shields.io/nuget/v/Dirge?styles=flat)](https://www.nuget.org/packages/Dirge/#versions-body-tab)
[![Download](https://img.shields.io/nuget/dt/Dirge?styles=flat)](https://www.nuget.org/packages/Dirge/#versions-body-tab)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/IkuzakIkuzok/Dirge/blob/main/LICENSE)

Disposable Implementation Roslyn Generator Extension
## Installation

You can install the EnumSerializer from [NuGet](https://www.nuget.org/packages/Dirge/).

## Usage

Mark a class with the `[AutoDispose]` attribute and implement the `IDisposable` interface.
The generator will automatically generate the implementation of the `Dispose` method for you.

```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly Stream _stream = new MemoryStream();
}
```

The generated code will look like this:
```C#
namespace Test;

partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                this._stream?.Dispose();
            }
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }
}
```

Note that this example is simplified for demonstration purposes.

To suppress the auto-generated Dispose call for a specific field, you can use the `[DoNotDispose]` attribute:
```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly Stream _stream1 = new MemoryStream();

    [DoNotDispose]
    private readonly Stream _stream2 = new MemoryStream(); // This field will not be disposed by the generated Dispose method.
}
```

Ref-struct is also supported, but `IDisposable` will not be implemented regardless of the language version.

### Conditional disposal

Conditional disposal, which allows you to specify conditions under which a field should be disposed, is also supported.
You can use the `[DoNotDisposeWhen]` attribute with a boolean field and a value to compare against:
```C#
using Dirge;

namespace Test;

[AutoDispose]
internal partial class TestClass
{
    private readonly bool _leaveOpen;

    [DoNotDisposeWhen(nameof(_leaveOpen), true)]
    private readonly Stream _stream;

    internal TestClass(Stream stream, bool leaveOpen)
    {
        this._stream = stream;
        this._leaveOpen = leaveOpen;
    }
}
```

This will prevent the generator from disposing the `_stream` field when the `_leaveOpen` field is `true`:
```C#
namespace Test;

partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                if (!this._leaveOpen)
                {
                    this._stream?.Dispose();
                }
            }
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }
}
```

### Unmanaged resources

To safely release unmanaged resources, this generator also supports the implementation of a finalizer.
You can specify a method to release unmanaged resources through the `ReleaseUnmanagedResources` option:
```C#
using Dirge;
using System.IO;
        
namespace Test;
        
[AutoDispose(ReleaseUnmanagedResources = nameof(ReleaseUnmanagedResources))]
internal sealed partial class TestClass
{
    private readonly Stream _stream;

    internal void ReleaseUnmanagedResources()
    {
        // Custom logic to release unmanaged resources
    }
}
```

This will generate a finalizer that calls the specified method to release unmanaged resources:
```C#
namespace Test;

sealed partial class TestClass : IDisposable
{
    private bool __generated_disposed = false;

    public void Dispose()
    {
        Dispose(true);
        global::System.GC.SuppressFinalize(this);
    }

    private void Dispose(bool disposing)
    {
        if (this.__generated_disposed) return;

        try
        {
            if (disposing)
            {
                this._stream?.Dispose();
            }

            ReleaseUnmanagedResources();
        }
        finally
        {
            this.__generated_disposed = true;
        }
    }

    ~TestClass()
    {
        Dispose(false);
    }
}
```

## Constraints

To generate the `Dispose` method, the class (or struct) must meet the following constraints:
- It must be a non-static class.
- It must be a partial class or struct.
- It must not be a readonly struct.

For conditional disposal, the field specified in the `nameof` expression must be a boolean field.
Properties and methods are not supported for the current version.
