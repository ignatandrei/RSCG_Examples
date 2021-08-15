using System;

namespace DuckingInterfaces
{
    [Duckable]
    public interface IPerson
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
