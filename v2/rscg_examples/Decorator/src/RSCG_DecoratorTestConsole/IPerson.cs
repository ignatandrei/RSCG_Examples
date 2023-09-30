namespace RSCG_DecoratorTestConsole
{
    public interface IPerson
    {
        string? FirstName { get; set; }
        string? LastName { get; set; }

        string FullName(string separator="");

        public Task SaveId(int id);
    }
}