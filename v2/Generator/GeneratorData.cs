namespace Generator;
public record GeneratorData(bool show,DateTime dtStart)
{
    public GeneratorData(bool show,DateTime dtStart, Category category):this(show,dtStart)
    {
            this.Category = category;
    }
    public Category Category { get; set; }
    public GeneratorData PutCategory(Category category)
    {
        this.Category = category;
        return this;
    }
    public string DateString
    {
        get
        {
            return dtStart.ToString("s");
        }
    }

}
public enum Category
{
    None=0,
    EnhancementProject,
    EnhancementClass ,
    DependencyInjection,
    FilesToCode,
    FunctionalProgramming,
    PrimitiveObsession,
    Templating,
    Tests,
    Database,
    API,

}

