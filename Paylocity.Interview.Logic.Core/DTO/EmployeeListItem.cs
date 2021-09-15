using System;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Provides all the details per employee needed to draw the Employee List screen
    /// Javascript: Paylocity.Interview.Web.Scripts.Interfaces.Core.IEmployeeListItem
    /// </summary>
    public class EmployeeListItem
    {
        public Guid Guid { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }

        public EmployeeListItem(Guid pGuid, string pFirstName, string pLastName, string pEmail)
        {
            Guid = pGuid;
            FirstName = pFirstName;
            LastName = pLastName;
            Email = pEmail;
        }

        internal EmployeeListItem(DB.Employee pEmployee)
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
        }
    }
}
