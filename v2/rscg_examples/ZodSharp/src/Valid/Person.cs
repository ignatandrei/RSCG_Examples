using System.ComponentModel.DataAnnotations;
using ZodSharp.SourceGenerators;

namespace Valid;

[ZodSchema]
public partial class Person
{
    [Range(18, 199)]
    public int Age { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;

    
}
