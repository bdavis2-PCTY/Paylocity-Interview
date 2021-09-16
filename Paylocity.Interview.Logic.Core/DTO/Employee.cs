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
        public string PhoneNumber { get; set; }
        public Address Address { get; set; }
        public List<DTO.Dependent> Dependents { get; set; }  
        public bool IsActive { get; set; }

        /// <summary>
        /// Annual salary before deductions
        /// TODO: Implement at the database level
        /// </summary>
        public double GrossAnnualSalary { 
            get => GrossPaycheckAmount * 26d; // GrossPaycheckAmount/paycheck * 26 paychecks/yr 
        }

        /// <summary>
        /// Paycheck amount before deductions
        /// </summary>
        public double GrossPaycheckAmount
        {
            // TODO: Move to a database value
            get => 2000d;
        }

        public Employee() { }

        public Employee(Guid pGuid, string pFirstName, string pLastName, string pEmail, string pPhoneNumber, Address pAddress, bool pIsActive)
        {
            Guid = pGuid;
            FirstName = pFirstName;
            LastName = pLastName;
            Email = pEmail;
            PhoneNumber = pPhoneNumber;
            Address = pAddress;
            IsActive = pIsActive;
        }

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
            PhoneNumber = pEmployee.PhoneNumber;
            Address = pAddress;
            Dependents = pDepdendents;
            IsActive = pEmployee.IsActive;
        }
    }
}
