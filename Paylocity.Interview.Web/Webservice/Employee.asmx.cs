using Newtonsoft.Json;
using Paylocity.Interview.Logic.Core;
using Paylocity.Interview.ORM;
using System.Web.Script.Services;
using System.Web.Services;

namespace Paylocity.Interview.Web.Webservice
{
    /// <summary>
    /// Summary description for Employee
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
    [System.Web.Script.Services.ScriptService]
    public class Employee : System.Web.Services.WebService
    {
        [WebMethod(true)]
        [ScriptMethod(ResponseFormat = System.Web.Script.Services.ResponseFormat.Json)]
        public string GetEmployeeList()
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                var Employees = new EmployeeAPI(NHFactory.Session).GetEmployeeList();
                return JsonConvert.SerializeObject(Employees);
            }
        }
    }
}
