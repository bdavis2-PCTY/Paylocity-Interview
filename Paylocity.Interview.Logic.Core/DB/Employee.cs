using System;

namespace Paylocity.Interview.Logic.Core.DB
{
    /// <summary>
    /// Represents an Employee entry in the database 
    /// </summary>
    internal class Employee
    {
        public virtual int Id { get; protected internal set; }
        public virtual Guid Guid { get; protected internal set; }
        public virtual string FirstName { get; protected internal set; }
        public virtual string LastName { get; protected internal set; }
        public virtual string Email { get; protected internal set; }
        public virtual string SSN { get; protected internal set; }
        public virtual Guid PrimaryAddressGuid { get; protected internal set; }
        public virtual DateTime CreatedDateTime { get; protected internal set; }
        public virtual DateTime StartDate { get; protected internal set; }
        public virtual DateTime? EndDate { get; protected internal set; }

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
