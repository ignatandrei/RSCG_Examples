using Enhanced.GetTypes.Annotation;

namespace GetTypesForInterface;
public partial class ProjectTypes
{
    [DerivedTypes(typeof(IPerson))]
    public  static partial IEnumerable<Type> GetIPersonTypes();
}
