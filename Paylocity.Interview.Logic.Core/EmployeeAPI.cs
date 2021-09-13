using NHibernate;
using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core
{
    /// <summary>
    /// API for interacting with employees
    /// </summary>
    public class EmployeeAPI : BaseAPI
    {
        public EmployeeAPI(ISession pNHSession)
            : base(pNHSession) { }

        /// <summary>
        /// Gets all the users that have been entered
        /// Used for getting a high-level overview of the employees for the employee list
        /// </summary>
        /// <returns></returns>
        public List<DTO.EmployeeListItem> GetEmployeeList()
        {
            List<DTO.EmployeeListItem> Employees = (from e in NHSession.Query<DB.Employee>()
                                                    select new DTO.EmployeeListItem(e)).ToList();

            return Employees;
        }
    }
}
