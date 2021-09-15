using System.Linq;

namespace Paylocity.Interview.Logic.Core.Common
{
    public static class Formatters
    {
        /// <summary>
        /// Formats a phone number to be stored in the database
        /// Removes any non-numeric characters
        /// </summary>
        /// <param name="pPhoneNumber"></param>
        /// <returns></returns>
        public static string FormatPhoneNumberForDb(string pPhoneNumber)
        {
            if (string.IsNullOrWhiteSpace(pPhoneNumber))
            {
                return string.Empty;
            }

            return new string(pPhoneNumber.Where(c => char.IsDigit(c)).ToArray());
        }
    }
}
