using System;
using System.Collections.Generic;

namespace MatOps
{
    public interface IMatOps
    {
        public int Add(int a, int b);

        public int Division(int a, int b);
    }
    public enum Operation
    {
        None= 0,
        Add =1,
        Division=2
        
    }
    public class Data
    {
        public Operation Operation { get; set; }
        public int a { get; set; }
        
    }
    public class CalculatorInt 
    {
        
        private readonly IMatOps ops;

        public CalculatorInt(IMatOps ops)
        {
            this.ops = ops;
        }

        public int Calculate(int start, Data[] data)
        {
            var current = start;
            for (int i = 0; i < data.Length; i++)
            {
                switch (data[i].Operation)
                {
                    case Operation.Add:
                        current = ops.Division(current, data[i].a);
                        break;
                    case Operation.Division:
                        current = ops.Division(current, data[i].a);
                        break;
                }
            }
            return current;
        }
    }
}
