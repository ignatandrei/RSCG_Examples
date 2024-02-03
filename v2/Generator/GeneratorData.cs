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
        var cat=new GeneratorData(show,dtStart,category);        
        return cat;
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
    Constructor, 
    MVVM,
    EnhancementClass ,
    Mapper,
    DependencyInjection,
    FilesToCode,
    FunctionalProgramming,
    PrimitiveObsession,
    Templating,
    Tests,
    Database,
    API,
    Serializer,
    Optimizer,
    Disposer,
    Enum,
    Interface,
    Blazor,
    Hangfire,
    AOP,
}

