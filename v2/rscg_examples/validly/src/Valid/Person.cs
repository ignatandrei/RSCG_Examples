using System.ComponentModel.DataAnnotations;
using Validly;

namespace Valid;
[Validatable]
public partial class Person
{
    [Range(18, 199)]
    public int Age { get; set; }

    [Required]
    [MinLength(3)]
    public string Name { get; set; } = string.Empty;
}
