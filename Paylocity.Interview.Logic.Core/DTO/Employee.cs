using System;

namespace Paylocity.Interview.Logic.Core.DTO
{
    public class Employee
    {
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        internal Employee(DB.Employee pEmployee)
        {
            // pEmployee is not allowed to be null
            if (pEmployee == null)
            {
                throw new ArgumentNullException(nameof(pEmployee));
            }

            Guid = pEmployee.Guid;
            FirstName = pEmployee.FirstName;
            LastName = pEmployee.LastName;
        }
    }
}
