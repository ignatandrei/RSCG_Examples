﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CopyConstructor
{

    class Person
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}