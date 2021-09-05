using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CopyConstructor
{

    partial class Person
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
