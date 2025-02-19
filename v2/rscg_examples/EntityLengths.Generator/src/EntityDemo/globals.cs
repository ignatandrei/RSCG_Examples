global using Microsoft.EntityFrameworkCore;
global using Stats.Database;
using EntityLengths.Generator.Configuration;

[assembly: EntityLengthsGenerator(
    GenerateDocumentation = false,
    GeneratedClassName = "Constants",
    LengthSuffix = "Length",
    IncludeNamespaces = ["Stats.Database"],
    ExcludeNamespaces = [],
    ScanNestedNamespaces = true,
    ScanEntitySuffix = null,
    Namespace = "EntityLengths.Generator.Sample"
)]