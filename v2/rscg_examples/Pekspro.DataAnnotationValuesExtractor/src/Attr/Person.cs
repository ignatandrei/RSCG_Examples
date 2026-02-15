using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Attr;

partial class Person
{
    [Display(Name = "First name")]
    [Required]
    [StringLength(100,MinimumLength =3)]
    public string? FirstName { get; set; }

    [Required]
    [Range(18, 200)]
    public int Age { get; set; }
}
