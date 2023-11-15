namespace FromInterface;
public partial class Person //: IPerson
{
   public string FullName() { return FirstName + " " + LastName; }

}
