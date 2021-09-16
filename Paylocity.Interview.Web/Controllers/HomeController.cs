using Paylocity.Interview.Logic.Core;
using Paylocity.Interview.ORM;
using System.Web.Mvc;

namespace Paylocity.Interview.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Used to get the Benefits Summary section of the EditEmployee Modal
        /// </summary>
        /// <param name="pEmployee"></param>
        /// <returns></returns>
        [HttpPost, ValidateInput(false)]
        public ActionResult BenefitSummary(Logic.Core.DTO.Employee pEmployee)
        {
            using (NHibernateFactory NHFactory = new NHibernateFactory())
            {
                var EmployeeBenefitSummary = new EmployeeAPI(NHFactory.Session).GetEmployeeBenefits(pEmployee);
                return PartialView("_BenefitSummary", EmployeeBenefitSummary);
            }
        }
    }
}
