namespace SRM;
interface INameClass
{
    [Svee4.RequiredStaticMembers.RequiredAttribute]
    public static virtual string ClassName => throw new NotImplementedException();
}
