using NHibernate;
using System;
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
            try
            {
                // TODO: Add security so only verified user can access

                List<DTO.EmployeeListItem> Employees = (from e in NHSession.Query<DB.Employee>()
                                                        select new DTO.EmployeeListItem(e)).ToList();

                return Employees;
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Gets all the details for a given employee
        /// Includes address and dependent info
        /// </summary>
        /// <param name="pEmployeeGuid">The GUID of the employee to get</param>
        /// <returns>The employee DTO or NULL</returns>
        public DTO.Employee GetEmployee(Guid pEmployeeGuid)
        {
            try
            {
                // TODO: Add security so only verified user can access

                DTO.Employee Employee = null;

                var EmployeeDetails = (from e in NHSession.Query<DB.Employee>()
                                       join a in NHSession.Query<DB.Address>() on e.PrimaryAddressGuid equals a.Guid into employeeAddress
                                       from a in employeeAddress.DefaultIfEmpty()
                                       where e.Guid == pEmployeeGuid
                                       select new
                                       {
                                           Employee = e,
                                           Address = a
                                       }).FirstOrDefault();

                if (EmployeeDetails != null)
                {
                    // Determine address
                    DTO.Address Address = null;
                    if (EmployeeDetails.Address != null)
                    {
                        Address = new DTO.Address(EmployeeDetails.Address);
                    }

                    // Determine Dependents
                    List<object> Dependents = new List<object>();

                    Employee = new DTO.Employee(EmployeeDetails.Employee, Address, Dependents);
                }

                return Employee;
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }
    }
}
