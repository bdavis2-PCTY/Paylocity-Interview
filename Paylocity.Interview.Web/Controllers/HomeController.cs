using Paylocity.Interview.Logic.Core;
using Paylocity.Interview.ORM;
using System;
using System.Web.Mvc;

namespace Paylocity.Interview.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult BenefitSummary(Guid pEmployeeGuid)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                var EmployeeBenefitSummary = new EmployeeAPI(NHFactory.Session).GetEmployeeBenefits(pEmployeeGuid);
                return PartialView("_BenefitSummary", EmployeeBenefitSummary);
            }
        }
    }
}
