using System.Web.Mvc;

namespace Paylocity.Interview.Controllers
{
    /// <summary>
    /// Controller for serving up modal HTML for lazy-loaded modals
    /// </summary>
    public class ModalController : Controller
    {
        public ActionResult EditEmployee()
        {
            return PartialView("~/Modals/EditEmployee.cshtml");
        }

        public ActionResult AddDependent()
        {
            return PartialView("~/Modals/AddDependent.cshtml");
        }
    }
}
