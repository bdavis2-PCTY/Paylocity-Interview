using System.Collections.Generic;
using System.Web.Optimization;

namespace Paylocity.Interview.Web
{
    public class BundleConfig
    {
        public static Dictionary<string, string> BundleDictionary = new Dictionary<string, string>();

        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = Config.Values.EnableOptimizations;

            #region Commons/Fundamentals

            // Libraries
            bundles.Add(new ScriptBundle("~/bundles/libraries").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/less_{version}.js",
                        "~/Scripts/semantic.min.js"));

            bundles.Add(new CustomStyleBundle("~/bundles/libraryStyles",
                "~/Content/semantic.min.css",
                "~/Content/Site.less"));

            // Webservices
            bundles.Add(new ScriptBundle("~/bundles/webservices").Include(
                   "~/Webservice/*.js"));

            #endregion Commons/Fundamentals
        }
    }
}
