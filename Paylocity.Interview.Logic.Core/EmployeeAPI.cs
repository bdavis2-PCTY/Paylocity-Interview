using NHibernate;
using System.Linq;

namespace Paylocity.Interview.Logic.Core
{
    /// <summary>
    /// API for interacting with employees
    /// </summary>
    public class EmployeeAPI
    {
        private readonly ISession _NHSession;

        public EmployeeAPI(ISession pNHSession)
        {
            _NHSession = pNHSession;
        }

        /// <summary>
        /// Gets all the users that have been entered
        /// </summary>
        /// <returns></returns>
        public object GetEmployees()
        {
            var Result = (from e in _NHSession.Query<DB.Employee>()
                          select new DTO.Employee(e)).ToList();

            return Result;
        }
    }
}
