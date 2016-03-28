using Microsoft.Extensions.PlatformAbstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace wordgame.Models
{
    public static class Word
    {
        static Random random;
        static IEnumerable<string> words;

        static Word()
        {
            try {
                words = File.ReadAllLines(PlatformServices.Default.Application.ApplicationBasePath + "/Models/words.txt")
                            .Select(line => line.Split(' ')[0]);
            } catch (Exception e) {
                Console.WriteLine("Failed to read file: " + e);
            }
            random = new Random();
        }

        public static string RandomWord()
        {
            int index = random.Next(words.Count());
            return words.ElementAt(index);
        }
    }
}
