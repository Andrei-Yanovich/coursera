using System;

namespace InversionCounting
{
    public class InversionCountingImpl
    {
        public static long Count(int[] array)
        {
            int[] sortedOutput;
            return SortAndCount(array, out sortedOutput);
        }

        public static long SortAndCount(int[] array, out int[] sortedOutput)
        {
            var n = array.Length;
            if (n == 1)
            {
                sortedOutput = array;
                return 0;
            }

            var length = n / 2; 
            var left = new int[length];
            var right = new int[n - length];

            Array.Copy(array, left, length);
            Array.Copy(array, length, right, 0, right.Length);

            var x = SortAndCount(left, out left);
            var y = SortAndCount(right, out right);
            var z = MergeAndCountSplitInv(left, right, out sortedOutput);

            return x + y + z;
        }

        private static long MergeAndCountSplitInv(int[] sortedLeft, int[] sortedRight, out int[] sortedOutput)
        {
            var inversionsCount = 0;
            sortedOutput = new int[sortedLeft.Length + sortedRight.Length];
            if (sortedLeft[sortedLeft.Length - 1] <= sortedRight[0])
            {
                Array.Copy(sortedLeft, sortedOutput, sortedLeft.Length);
                Array.Copy(sortedRight, 0, sortedOutput, sortedLeft.Length, sortedRight.Length);
                return 0;
            }

            var r = 0;
            var l = 0;
            for (var o = 0; o < sortedOutput.Length; o++)
            {
                if (r >= sortedRight.Length)
                {
                    sortedOutput[o] = sortedLeft[l];
                    l += 1;
                    continue;
                }

                if (l >= sortedLeft.Length)
                {
                    sortedOutput[o] = sortedRight[r];
                    r += 1;
                    continue;
                }

                if (sortedRight[r] > sortedLeft[l])
                {
                    sortedOutput[o] = sortedLeft[l];
                    l += 1;
                }
                else
                {
                    inversionsCount += sortedLeft.Length - l;
                    sortedOutput[o] = sortedRight[r];
                    r += 1;
                }
            }

            return inversionsCount;
        }
    }
}