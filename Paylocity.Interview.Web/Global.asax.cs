using Paylocity.Interview.Web;
using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Paylocity.Interview
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected void Application_Start()
        {
            log4net.Config.XmlConfigurator.Configure();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private void Application_Error(object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
            if (ex is System.Web.HttpException)
            {
                // Check for common errors
                // Only report the error line for common errors, not the entire stack
                string Message = Server.GetLastError().Message;
                string HttpMethod = Request?.HttpMethod;
                if (Message.Contains("The remote host closed the connection")
                    || Message.Contains("does not implement IController")
                    || Message.Contains("HTTP headers have been sent")
                    || Message.Contains("A public action method"))
                {
                    string Warning = Server.GetLastError().Message;
                    if (!string.IsNullOrWhiteSpace(HttpMethod)) { Warning += $" (Request Type: {HttpMethod})"; }
                    Log.Warn(Warning);
                }
                else
                {
                    Log.Error(Server.GetLastError());
                }
            }
            else
            {
                if (ex.GetType().FullName.StartsWith("ConDoc"))
                {
                    // ConDoc specific errors have been handled elsewhere in code
                    Log.Warn(ex.Message);
                }
                else
                {
                    Log.Error("Unexpected Application Error", ex);
                }
            }
        }
    }
}
