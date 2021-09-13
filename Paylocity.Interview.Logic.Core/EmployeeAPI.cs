using NHibernate;
using Paylocity.Interview.Logic.Core.DTO;
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
                var EmployeeDetails = (from e in NHSession.Query<DB.Employee>()
                                       join a in NHSession.Query<DB.Address>() on e.PrimaryAddressGuid equals a.Guid into employeeAddress
                                       from a in employeeAddress.DefaultIfEmpty()
                                       where e.Guid == pEmployeeGuid
                                       select new
                                       {
                                           Employee = e,
                                           Address = a
                                       }).FirstOrDefault();

                if (EmployeeDetails == null)
                {
                    throw new Exceptions.Core.EmployeeDoesNotExistException();
                }

                // Determine address
                DTO.Address Address = null;
                if (EmployeeDetails.Address != null)
                {
                    Address = new DTO.Address(EmployeeDetails.Address);
                }

                // Query dependents
                List<DTO.Dependent> Dependents = (from d in NHSession.Query<DB.Dependent>()
                                                  where d.EmployeeGuid == pEmployeeGuid
                                                  select new DTO.Dependent(d)).ToList();

                return new DTO.Employee(EmployeeDetails.Employee, Address, Dependents);
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Gets the benefit details of an employee
        /// </summary>
        /// <param name="pEmployeeGuid"></param>
        /// <returns></returns>
        public List<BenefitCharge> GetEmployeeBenefits(Guid pEmployeeGuid)
        {
            try
            {
                DTO.Employee Employee = GetEmployee(pEmployeeGuid);
                List<BenefitCharge> Charges = new List<BenefitCharge>();

                // Add base employee charge
                var EmployeeCharge = new BenefitCharge(1000, $"Monthly employee benefits for {Employee.FirstName} {Employee.LastName}", new List<BenefitDiscount>());
                if (Employee.FirstName.ToLower().StartsWith("a"))
                {
                    EmployeeCharge.Discounts.Add(new BenefitDiscount(0.1, $"Employee name '{Employee.FirstName}' starts with A"));
                }
                Charges.Add(EmployeeCharge);

                // Add charges for dependents
                foreach (var Dependent in Employee.Dependents)
                {
                    var DependentCharge = new BenefitCharge(500, $"Monthly dependent {Dependent.FirstName} {Dependent.LastName}", new List<BenefitDiscount>());
                    if (Dependent.FirstName.ToLower().StartsWith("a"))
                    {
                        DependentCharge.Discounts.Add(new BenefitDiscount(0.1, $"Dependent name '{Dependent.FirstName}' starts with A"));
                    }
                    Charges.Add(DependentCharge);
                }

                return Charges;
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }
    }
}
