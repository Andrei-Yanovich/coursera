using System;

namespace Mergesort
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var array = new[] { 5, 4, 3, 2, 6, 3, 66 };
            array = MergeSort(array);

            foreach (var item in array)
            {
                Console.Write(item);
                Console.Write(" ");
            }
            Console.ReadLine();
        }

        private static int[] MergeSort(int[] array)
        {
            if (array.Length == 0 || array.Length == 1)
            {
                return array;
            }

            var half = array.Length / 2;
            var right = new int[half];
            Array.Copy(array, right, half);
            var left = new int[array.Length - half];
            Array.Copy(array, half, left, 0, left.Length);

            right = MergeSort(right);
            left = MergeSort(left);

            array = Merge(right, left);
            return array;
        }

        private static int[] Merge(int[] right, int[] left)
        {
            var array = new int[right.Length + left.Length];

            var r = 0;
            var l = 0;
            for (var o = 0; o < array.Length; o++)
            {
                if (r >= right.Length)
                {
                    array[o] = left[l];
                    l += 1;
                    continue;
                }

                if (l >= left.Length)
                {
                    array[o] = right[r];
                    r += 1;
                    continue;
                }

                if (right[r] > left[l])
                {
                    array[o] = left[l];
                    l += 1;
                }
                else
                {
                    array[o] = right[r];
                    r += 1;
                }
            }

            return array;
        }
        
    }
}
