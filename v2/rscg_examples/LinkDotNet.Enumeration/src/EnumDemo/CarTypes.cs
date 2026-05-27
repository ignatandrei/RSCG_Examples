using LinkDotNet.Enumeration;
namespace EnumDemo;

[Enumeration(Casing.Preserve,"None", "Dacia", "Tesla", "BMW", "Mercedes")]
public sealed partial record CarTypes;
