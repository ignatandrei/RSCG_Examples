using Aigamo.MatchGenerator;
namespace EnumDemo;

[GenerateMatch]
public enum CarTypes 
{
    None,
    Dacia,
    
    Tesla,
    
    BMW,
    
    Mercedes,
}


[GenerateMatch]
abstract record MaritalStatus;

sealed record Single : MaritalStatus;
sealed record Married : MaritalStatus;
sealed record Divorced : MaritalStatus;
sealed record Widowed : MaritalStatus;