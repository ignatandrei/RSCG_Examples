using Ling.Audit;

namespace LingDemo;
partial class Person :IFullAudited<Guid>
{
    public int ID { get; set; }
    public string FirstName { get; set; }= string.Empty;
    public string LastName { get; set; } = string.Empty;
}
