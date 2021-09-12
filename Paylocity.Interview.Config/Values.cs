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

            if (bool.TryParse(ConfigurationManager.AppSettings["EnableOptimizations"], out bool isOptimizationsEnabled))
            {
                EnableOptimizations = isOptimizationsEnabled;
            }
        }

        /// <summary>
        /// Gets the base URL of the website
        /// EX. http://localhost/Paylocity-Interview/
        /// </summary>
        public static string URL { get; private set; }

        /// <summary>
        /// Whether or not CSS/JS optimizations enabled
        /// When TRUE, CSS and JS files will be minified and bundled together
        /// </summary>
        public static bool EnableOptimizations { get; private set; }
    }
}
