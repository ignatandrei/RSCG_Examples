namespace UnflatDemo
{
    [Unflat.UnflatMarker]
    public partial class Person
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
