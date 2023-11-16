namespace DemoValidatorObj;
public class MyAppOptionsCustom: IValidatableObject   
{
    public const string ConfigName = "MyAppOptionsInConfig";
    [Required]
    [MinLength(3)]
    public string AppDisplayName { get; set; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (AppDisplayName.Contains("!"))
            yield return new ValidationResult("AppDisplayName should not contain !");
    }
}
