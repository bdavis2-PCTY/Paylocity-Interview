namespace Paylocity.Interview.Logic.Core.Common
{
    /// <summary>
    /// Helper methods to validate data
    /// </summary>
    public static class Validators
    {
        /// <summary>
        /// Validates whether or not an email address is valid
        /// </summary>
        /// <param name="pEmailAddress"></param>
        /// <returns>
        /// TRUE when the email address is valid
        /// FALSE when the email address is not valid
        /// </returns>
        public static bool IsValidEmailAddress(string pEmailAddress)
        {
            if (!string.IsNullOrWhiteSpace(pEmailAddress))
            {
                string Email = pEmailAddress.ToLower();
                try
                {
                    var Address = new System.Net.Mail.MailAddress(Email);
                    return Address.Address == Email;
                }
                catch { }
            }
            return false;
        }
    }
}
