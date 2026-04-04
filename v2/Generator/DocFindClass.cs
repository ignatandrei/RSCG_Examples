using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generator;

/// <summary>
/// irm https://microsoft.github.io/docfind/install.ps1 | iex
/// curl -fsSL https://microsoft.github.io/docfind/install.sh | sh
/// </summary>
public class DocFindObject
{
    public DocFindObject(Description d)
    {
        this.category = (d.GeneratorData?.Category.ToString())??"";
        this.body = (d.DescriptionNuget?.ToString())??"";
        this.href = $"/RSCG_Examples/v2/docs/{d.Generator?.Name??""}/";
        this.title = d.Generator?.Name??"";
    }

    public string title { get; set; }
    public string category { get; set; }
    public string href { get; set; }
    public string body { get; set; }
}

