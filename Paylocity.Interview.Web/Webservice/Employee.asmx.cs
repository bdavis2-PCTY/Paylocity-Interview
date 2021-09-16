using Newtonsoft.Json;
using Paylocity.Interview.Logic.Core;
using Paylocity.Interview.ORM;
using System;
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
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployeeList(bool pIncludeInactive)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                var Employees = new EmployeeAPI(NHFactory.Session).GetEmployeeList(pIncludeInactive);
                return JsonConvert.SerializeObject(Employees);
            }
        }

        [WebMethod(true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEmployee(Guid pEmployeeGuid)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                var Employee = new EmployeeAPI(NHFactory.Session).GetEmployee(pEmployeeGuid);
                return JsonConvert.SerializeObject(Employee);
            }
        }

        [WebMethod(true)]
        public string CreateEmployee(Logic.Core.DTO.Employee pEmployee)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                Guid EmployeeGuid = new EmployeeAPI(NHFactory.Session).CreateEmployee(pEmployee);
                return JsonConvert.SerializeObject(EmployeeGuid);
            }
        }

        [WebMethod(true)]
        public void UpdateEmployee(Logic.Core.DTO.Employee pEmployee)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                new EmployeeAPI(NHFactory.Session).UpdateEmployee(pEmployee);
            }
        }

        [WebMethod(true)]
        public void SetEmployeeActive(Guid pEmployeeGuid, bool pIsActive)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                new EmployeeAPI(NHFactory.Session).SetEmployeeActive(pEmployeeGuid, pIsActive);
            }
        }
    }
}
