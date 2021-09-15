using System;

namespace Paylocity.Interview.Exceptions.Core
{
    /// <summary>
    /// Thrown when attempting to query an employee that does not exist
    /// </summary>
    public class EmployeeDoesNotExistException : Exception
    {
    }

    /// <summary>
    /// Thrown when bad form data is passed up
    /// </summary>
    public class InvalidFormField : Exception
    {
        public InvalidFormField(string pFieldName)
            : base($"Invalid form input: {pFieldName}")
        {
        }
    }
}
