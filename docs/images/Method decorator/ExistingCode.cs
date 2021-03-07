[AutoMethods(template =TemplateMethod.CustomTemplateFile,MethodPrefix ="prv" ,CustomTemplateFileName ="MethodDecorator.txt")]
public partial class Person
{
     public string FirstName{ get; set; }
     public string LastName { get; set; }

     private string prvFullName()
     {
          return FirstName + " " + LastName;
     }
}