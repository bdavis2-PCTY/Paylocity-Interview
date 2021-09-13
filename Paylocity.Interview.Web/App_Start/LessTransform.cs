using System.Web.Optimization;

namespace Paylocity.Interview.Web
{
    /// <summary>
    /// Used to transform LESS into CSS upon client request
    /// https://docs.microsoft.com/en-us/aspnet/mvc/overview/performance/bundling-and-minification
    /// </summary>
    public class LessTransform : IBundleTransform
    {
        public void Process(BundleContext context, BundleResponse response)
        {
            response.Content = dotless.Core.Less.Parse(response.Content);
            response.ContentType = "text/css";
        }
    }
}
