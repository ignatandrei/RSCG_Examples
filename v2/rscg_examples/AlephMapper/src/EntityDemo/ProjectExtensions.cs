namespace EntityDemo;
public static partial class ProjectExtensions
{
    [AlephMapper.Expressive(NullConditionalRewrite = AlephMapper.NullConditionalRewrite.Rewrite)]
    public static ProjectDTO ProjToDTO(Stats.Database.Project project) =>

        new ProjectDTO
        {
            Name = project.Name,
            CountStars = project.Stars?.Count ?? 0
        }
        ;
    
}