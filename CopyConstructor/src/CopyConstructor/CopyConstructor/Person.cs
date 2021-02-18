using AOPMethodsCommon;
using System;
using System.Collections.Generic;
using System.Text;

namespace CopyConstructor
{

    [AutoMethods(template = TemplateMethod.CustomTemplateFile, CustomTemplateFileName = "CopyConstructorDestructor.txt")]
    partial class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
