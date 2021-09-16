using System.Web.Mvc;

namespace Paylocity.Interview.Web.Controllers
{
    /// <summary>
    /// Controller for serving up modal HTML for lazy-loaded modals
    /// </summary>
    public class ModalController : Controller
    {
        /// <summary>
        /// Returns HTML for the EditEmployee Modal
        /// </summary>
        /// <returns></returns>
        public ActionResult EditEmployee()
        {
            return PartialView("~/Modals/EditEmployee.cshtml");
        }

        /// <summary>
        /// Returns HTML for the AddDependent Modal
        /// </summary>
        /// <returns></returns>
        public ActionResult AddDependent()
        {
            return PartialView("~/Modals/AddDependent.cshtml");
        }
    }
}
