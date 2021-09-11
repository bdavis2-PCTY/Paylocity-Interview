using System;

namespace Paylocity.Interview.Logic.Core.DB
{
    /// <summary>
    /// Represents an Employee database object
    /// </summary>
    internal class Employee
    {
        public int Id { get; internal set; }
        public Guid Guid { get; internal set; }
        public string FirstName { get; internal set; }
        public string LastName { get; internal set; }
        public string Email { get; internal set; }
        public string SSN { get; internal set; }
        public Guid PrimaryAddressGuid { get; internal set; }
        public DateTime CreatedDateTime { get; internal set; }
        public DateTime StartDate { get; internal set; }
        public DateTime? EndDate { get; internal set; }

        protected Employee()
        {
        }

        public Employee(Guid pGuid, string pFirstName, string pLastName, string pEmail, string pSSN, Guid pPrimaryAddressGuid, DateTime pStartDate, DateTime? pEndDate)
        {
            Guid = pGuid;
            FirstName = pFirstName;
            LastName = pLastName;
            Email = pEmail;
            SSN = pSSN;
            PrimaryAddressGuid = pPrimaryAddressGuid;
            StartDate = pStartDate;
            EndDate = pEndDate;
        }
    }
}
