// 1 3 5 2 4 6 - has 3 inversions 3,2 5,2 5,4

using System;
using System.IO;
using System.Linq;

namespace InversionCounting
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] input;
            using (var streamReader = new StreamReader(@"..\..\IntegerArray.txt"))
            {
                var line = streamReader.ReadToEnd();
                input = line.Split(new[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse).ToArray();
            }

            var result = InversionCountingImpl.Count(input);
            Console.WriteLine("Input file has {0} integers", input.Length);
            Console.WriteLine("The result is {0}", result);
            Console.ReadLine();
        }

        private static void InitialTest()
        {
            Console.WriteLine("1 3 5 2 4 6 - has 3 inversions 3,2 5,2 5,4");

            var input = new[] {1, 3, 5, 2, 4, 6};
            var countOfInversions = InversionCountingImpl.SortAndCount(input, out input);

            Console.WriteLine("inversions count: {0}", countOfInversions);
            Console.WriteLine("ordered array: {0}", input.Aggregate("", (s, i) => s + i + " "));

            Console.ReadLine();
        }
    }
}