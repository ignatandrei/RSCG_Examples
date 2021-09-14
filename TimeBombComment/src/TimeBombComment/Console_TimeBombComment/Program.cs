using System;

namespace Console_TimeBombComment
{
    class Program
    {
        static void Main(string[] args)
        {
            //TB: 2021-09-13 this is a comment transformed into an error
            //TB: and this is a warning
            //TB: 2022-12-30 and this should not appear yet
            Console.WriteLine("See the TB comment above ? ");
        }
    }
}
