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
            bundles.Add(new ScriptBundle("~/bundles/libraryScripts").Include(
                "~/Content/Libraries/jquery/jquery-3.6.0.min.js",
                "~/Content/Libraries/semanticUI/semantic.js",
                "~/Content/Libraries/jquery.dataTables/jquery.dataTables.min.js",
                "~/Content/Libraries/jquery.dataTables/dataTables.semanticui.js"
            ));

            bundles.Add(new CustomStyleBundle("~/bundles/libraryStyles",
                "~/Content/Libraries/semanticUI/semantic.css",
                "~/Content/Libraries/jquery.dataTables/jquery.dataTables.min.css",
                "~/Content/Libraries/jquery.dataTables/dataTables.semanticui.css",
                "~/Content/Site.less"
            ));

            // Commons
            bundles.Add(new ScriptBundle("~/bundles/commonScripts").Include(
                "~/Scripts/Helpers/*.js"
            ));

            // Webservices
            bundles.Add(new ScriptBundle("~/bundles/webserviceScripts").Include(
                "~/Webservice/WebserviceBase.js",
                "~/Webservice/*.js"
            ));

            #endregion Commons/Fundamentals

            #region Specific Pages

            bundles.Add(new ScriptBundle("~/bundles/pageHome").Include(
                "~/Scripts/Home.js",
                "~/Modals/BaseModal.js",
                "~/Modals/EditEmployee.js"
            ));

            #endregion Specific Pages
        }
    }
}
