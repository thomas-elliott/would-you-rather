using System;
using System.Linq;

namespace WouldYouRather.Utils
{
    public class KeyUtils
    {
        private static readonly Random Random = new Random();
        
        // TODO: Don't use something from StackExchange, make it securerandom especially for keys
        public static string RandomString(int length)
        {
            const string charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(charset, length).Select(s => s[Random.Next(s.Length)]).ToArray());
        }
    }
}