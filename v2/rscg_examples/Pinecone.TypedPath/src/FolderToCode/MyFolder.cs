using System;
using System.Collections.Generic;
using System.Text;
using TypedPath;

namespace FolderToCode;

[TypedPath("MyFolderToShow")]
public partial  class MyFolder: ITypedPath
{
    public static string Wrap(string path)
    {
        return path;
    }
}
