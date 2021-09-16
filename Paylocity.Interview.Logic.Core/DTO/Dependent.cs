using System;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Provides all details about an employee's dependent
    /// Javascript: Paylocity.Interview.Web.Scripts.Interfaces.Core.IDependent
    /// </summary>
    public class Dependent
    {
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid EmployeeGuid { get; set; }
        public DateTime CreatedDateTime { get; set; }

        public Dependent()
        {
        }

        internal Dependent(DB.Dependent pDependent)
        {
            // pEmployee is not allowed to be null
            if (pDependent == null)
            {
                throw new ArgumentNullException(nameof(pDependent));
            }

            Guid = pDependent.Guid;
            FirstName = pDependent.FirstName;
            LastName = pDependent.LastName;
            EmployeeGuid = pDependent.EmployeeGuid;
            CreatedDateTime = pDependent.CreatedDateTime;
        }
    }
}
