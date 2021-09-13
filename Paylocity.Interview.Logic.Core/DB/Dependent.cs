using System;

namespace Paylocity.Interview.Logic.Core.DB
{
    /// <summary>
    /// Represents an Dependent entry in the database 
    /// </summary>
    internal class Dependent
    {
        public virtual int Id { get; protected internal set; }
        public virtual Guid Guid { get; protected internal set; }
        public virtual string FirstName { get; protected internal set; }
        public virtual string LastName { get; protected internal set; }
        public virtual Guid EmployeeGuid { get; protected internal set; }
        public virtual DateTime CreatedDateTime { get; protected internal set; }

        protected Dependent()
        {
        }

        public Dependent(Guid pGuid, string pFirstName, string pLastName, Guid pEmployeeGuid, DateTime pCreatedDateTime)
        {
            Guid = pGuid;
            FirstName = pFirstName;
            LastName = pLastName;
            EmployeeGuid = pEmployeeGuid;
            CreatedDateTime = pCreatedDateTime;
        }
    }
}
