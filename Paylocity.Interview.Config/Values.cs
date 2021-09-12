using System.Configuration;

namespace Paylocity.Interview.Config
{
    /// <summary>
    /// Allows access to application configuration values
    /// </summary>
    public static class Values
    {
        static Values()
        {
            URL = ConfigurationManager.AppSettings["URL"];
        }

        /// <summary>
        /// Gets the base URL of the website
        /// EX. http://localhost/Paylocity-Interview/
        /// </summary>
        public static string URL { get; private set; }
    }
}
