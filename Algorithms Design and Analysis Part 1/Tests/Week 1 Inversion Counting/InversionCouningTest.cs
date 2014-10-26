using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using NUnit.Framework;
using InversionCounting;

namespace Tests
{
    [TestFixture]
    public class InversionCouningTest
    {
        [TestCase(new[] {1,6,3,2,4,5}, 5)]
        [TestCase(new[] {5,4,3,2,1}, 10)]
        [TestCase(new[] {1,5,3,2,4}, 4)]
        [TestCase(new[] { 1, 3, 5, 2, 4, 6 }, 3)]
        [TestCase(new[] { 9, 12, 3, 1, 6, 8, 2, 5, 14, 13, 11, 7, 10, 4, 0 }, 56)]
        [TestCase(new[] { 37, 7, 2, 14, 35, 47, 10, 24, 44, 17, 34, 11, 16, 48, 1, 39, 6, 33, 43, 26, 40, 4, 28, 5, 38, 41, 42, 12, 13, 21, 29, 18, 3, 19, 0, 32, 46, 27, 31, 25, 15, 36, 20, 8, 9, 49, 22, 23, 30, 45 }, 590)]
        [TestCase(new[] { 4, 80, 70, 23, 9, 60, 68, 27, 66, 78, 12, 40, 52, 53, 44, 8, 49, 28, 18, 46, 21, 39, 51, 7, 87, 99, 69, 62, 84, 6, 79, 67, 14, 98, 83, 0, 96, 5, 82, 10, 26, 48, 3, 2, 15, 92, 11, 55, 63, 97, 43, 45, 81, 42, 95, 20, 25, 74, 24, 72, 91, 35, 86, 19, 75, 58, 71, 47, 76, 59, 64, 93, 17, 50, 56, 94, 90, 89, 32, 37, 34, 65, 1, 73, 41, 36, 57, 77, 30, 22, 13, 29, 38, 16, 88, 61, 31, 85, 33, 54 }, 2372)]
        public void Tests(int[] input, int expectedResult)
        {
            var result = InversionCountingImpl.Count(input);

            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("hw1_test.txt", 242698)]
        public void TestsWithInputFromFiles(string fileName, int expectedResult)
        {
            int[] input;
            using (var streamReader = new StreamReader(@"..\..\Week 1 Inversion Counting\" + fileName))
            {
                var line = streamReader.ReadToEnd();
                input = line.Split(new[] {"\n"}, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse).ToArray();
            }

            var result = InversionCountingImpl.Count(input);

            Assert.AreEqual(expectedResult, result);
        }
    }
}