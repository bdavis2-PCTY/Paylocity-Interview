using System;
using System.Collections.Generic;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Provides all details about an employee
    /// Javascript: Paylocity.Interview.Web.Scripts.Interfaces.Core.IEmployee
    /// </summary>
    public class Employee
    {
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string SSN { get; set; }
        public Address Address { get; set; }

        public List<DTO.Dependent> Dependents { get; set; }

        public Employee() { }

        internal Employee(DB.Employee pEmployee, DTO.Address pAddress, List<DTO.Dependent> pDepdendents)
        {
            // pEmployee is not allowed to be null
            if (pEmployee == null)
            {
                throw new ArgumentNullException(nameof(pEmployee));
            }

            Guid = pEmployee.Guid;
            FirstName = pEmployee.FirstName;
            LastName = pEmployee.LastName;
            Email = pEmployee.Email;
            SSN = pEmployee.SSN;
            Address = pAddress;
            Dependents = pDepdendents;
        }
    }
}
