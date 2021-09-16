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

        #region Data Fetching

        /// <summary>
        /// Gets all the users that have been entered
        /// Used for getting a high-level overview of the employees for the employee list
        /// </summary>
        /// <param name="pIncludeInactive">
        /// When TRUE, inactive employees will also be returned
        /// </param>
        /// <returns></returns>
        public List<DTO.EmployeeListItem> GetEmployeeList(bool pIncludeInactive)
        {
            try
            {
                // TODO: Add security so only verified user can access

                List<DTO.EmployeeListItem> Employees = (from e in NHSession.Query<DB.Employee>()
                                                        where e.IsActive || pIncludeInactive
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

        #region Benefits

        /// <summary>
        /// Gets the benefit details of an existing employee
        /// </summary>
        /// <param name="pEmployeeGuid"></param>
        /// <returns></returns>
        public EmployeeBenefitSummary GetEmployeeBenefits(Guid pEmployeeGuid)
        {
            try
            {
                // TODO: Add security so only verified user can access
                DTO.Employee Employee = GetEmployee(pEmployeeGuid);
                return GetEmployeeBenefits(Employee);
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Gets the benefit details of an employee from DTO objects
        /// </summary>
        /// <param name="pEmployee"></param>
        /// <param name="pDependents"></param>
        /// <returns></returns>
        public EmployeeBenefitSummary GetEmployeeBenefits(DTO.Employee pEmployee)
        {
            try
            {
                // TODO: Add security so only authorized users can pull employee benefit data

                if (pEmployee == null)
                {
                    throw new ArgumentNullException(nameof(pEmployee));
                }

                List<BenefitDeduction> Charges = new List<BenefitDeduction>();

                // Add base employee charge
                var EmployeeCharge = new BenefitDeduction(1000, $"Employee benefits for {pEmployee.FirstName} {pEmployee.LastName}", new List<BenefitDeductionDiscount>());
                if (!string.IsNullOrWhiteSpace(pEmployee.FirstName) && pEmployee.FirstName.ToLower().StartsWith("a"))
                {
                    EmployeeCharge.Discounts.Add(new BenefitDeductionDiscount(0.1, $"Employee name starts with A"));
                }
                Charges.Add(EmployeeCharge);

                // Add charges for dependents
                if (pEmployee.Dependents != null)
                {
                    foreach (var Dependent in pEmployee.Dependents)
                    {
                        var DependentCharge = new BenefitDeduction(500, $"Dependent {Dependent.FirstName} {Dependent.LastName}", new List<BenefitDeductionDiscount>());
                        if (!string.IsNullOrWhiteSpace(Dependent.FirstName) && Dependent.FirstName.ToLower().StartsWith("a"))
                        {
                            DependentCharge.Discounts.Add(new BenefitDeductionDiscount(0.1, $"Dependent name starts with A"));
                        }
                        Charges.Add(DependentCharge);
                    }
                }

                return new EmployeeBenefitSummary(pEmployee, Charges);
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        #endregion Benefits

        #endregion Data Fetching

        #region Create/Update/Delete

        /// <summary>
        /// Creates a new employee with an associated address and dependents
        /// </summary>
        /// <param name="pEmployee"></param>
        /// <returns></returns>
        public Guid CreateEmployee(DTO.Employee pEmployee)
        {
            try
            {
                // TODO: Ensure user has permissions to add new employees

                // Validate user input
                ValidateEmployeeFields(pEmployee);

                Guid EmployeeGuid = Guid.NewGuid();

                // Save employee address
                DB.Address Address = new DB.Address(Guid.NewGuid(), pEmployee.Address.AddressLine1, pEmployee.Address.AddressLine2, pEmployee.Address.City, pEmployee.Address.State,
                    pEmployee.Address.PostalCode, pEmployee.Address.CountryCode, EmployeeGuid);
                NHSession.Save(Address);

                // Create employee
                DB.Employee Employee = new DB.Employee(EmployeeGuid, pEmployee.FirstName, pEmployee.LastName, pEmployee.Email, pEmployee.PhoneNumber, Address.Guid, DateTime.Now, true);
                NHSession.Save(Employee);

                // Create dependents
                if (pEmployee.Dependents != null && pEmployee.Dependents.Count > 0)
                {
                    foreach (var Dependent in pEmployee.Dependents)
                    {
                        DB.Dependent DBDependent = new DB.Dependent(Guid.NewGuid(), Dependent.FirstName, Dependent.LastName, Employee.Guid, DateTime.Now);
                        NHSession.Save(DBDependent);
                    }
                }

                NHSession.Flush();

                return Employee.Guid;
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Updates an existing employee
        /// This includes address and dependents
        /// </summary>
        /// <param name="pEmployee"></param>
        public void UpdateEmployee(DTO.Employee pEmployee)
        {
            try
            {
                // TODO: Ensure user has permission to update employees

                // Validate user input
                ValidateEmployeeFields(pEmployee);

                var Employee = GetEmployee(pEmployee.Guid);
                var DBEmployee = (from e in NHSession.Query<DB.Employee>()
                                  where e.Guid == pEmployee.Guid
                                  select e).FirstOrDefault();

                // Update core employee properties
                DBEmployee.FirstName = pEmployee.FirstName;
                DBEmployee.LastName = pEmployee.LastName;
                DBEmployee.Email = pEmployee.Email;
                DBEmployee.PhoneNumber = pEmployee.PhoneNumber;

                // Update Address (if changed)
                bool IsAddressedChanged = (Employee.Address == null && pEmployee.Address != null);
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.AddressLine1.ToLower() != pEmployee.Address.AddressLine1.ToLower());
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.AddressLine2.ToLower() != pEmployee.Address.AddressLine2.ToLower());
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.City.ToLower() != pEmployee.Address.City.ToLower());
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.State.ToLower() != pEmployee.Address.State.ToLower());
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.PostalCode.ToLower() != pEmployee.Address.PostalCode.ToLower());
                IsAddressedChanged = IsAddressedChanged || (Employee.Address.CountryCode.ToLower() != pEmployee.Address.CountryCode.ToLower());
                if (IsAddressedChanged)
                {
                    DB.Address NewAddress = new DB.Address(Guid.NewGuid(), pEmployee.Address.AddressLine1, pEmployee.Address.AddressLine2, pEmployee.Address.City, pEmployee.Address.State, pEmployee.Address.PostalCode, pEmployee.Address.CountryCode, pEmployee.Guid);
                    NHSession.Save(NewAddress);

                    DBEmployee.PrimaryAddressGuid = NewAddress.Guid;
                }

                // Update dependents
                // Find the initial changes
                var ExistingDependents = (from d in NHSession.Query<DB.Dependent>()
                                          where d.EmployeeGuid == pEmployee.Guid
                                          select d).ToList();

                var NewDependentGuids = pEmployee.Dependents.Select(x => x.Guid).ToList();
                var ExistingDependentGuids = ExistingDependents.Select(x => x.Guid).ToList();

                // Remove deleted dependents
                var RemoveDependnets = ExistingDependents.Where(existingDependent => !NewDependentGuids.Contains(existingDependent.Guid)).ToList();
                foreach (var RemoveDependnet in RemoveDependnets)
                {
                    NHSession.Delete(RemoveDependnet);
                }

                // Add new dependents
                var NewDependents = pEmployee.Dependents.Where(newDependent => !ExistingDependentGuids.Contains(newDependent.Guid)).ToList();
                foreach (var NewDependent in NewDependents)
                {
                    DB.Dependent Dependent = new DB.Dependent(Guid.NewGuid(), NewDependent.FirstName, NewDependent.LastName, pEmployee.Guid, DateTime.Now);
                    NHSession.Save(Dependent);
                }

                NHSession.Flush();
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Marks an employee as Inactive
        /// </summary>
        /// <param name="pEmployeeGuid"></param>
        public void DeleteEmployee(Guid pEmployeeGuid)
        {
            try
            {
                // TODO: Add security so only authorized users can delete employees

                var DBEmployee = (from e in NHSession.Query<DB.Employee>()
                                  where e.Guid == pEmployeeGuid
                                  select e).FirstOrDefault();

                // Ensure employee exists
                if (DBEmployee == null)
                {
                    throw new Exceptions.Core.EmployeeDoesNotExistException();
                }

                DBEmployee.IsActive = false;
                NHSession.Update(DBEmployee);
                NHSession.Flush();
            }
            catch (Exception ex)
            {
                ErrorHandler(ex);
                throw;
            }
        }

        /// <summary>
        /// Validates user input for an employee
        /// Will throw an exception if there is invalid data
        /// </summary>
        /// <param name="pEmployee"></param>
        private void ValidateEmployeeFields(DTO.Employee pEmployee)
        {
            // TODO: Use some type of library for user input validation

            // Verify the employee exists
            if (pEmployee == null)
                throw new ArgumentNullException(nameof(pEmployee));

            // Validate employee fields
            if (string.IsNullOrWhiteSpace(pEmployee.FirstName))
                throw new Exceptions.Core.InvalidFormField("First name");

            if (string.IsNullOrWhiteSpace(pEmployee.LastName))
                throw new Exceptions.Core.InvalidFormField("Last name");

            pEmployee.PhoneNumber = Common.Formatters.FormatPhoneNumberForDb(pEmployee.PhoneNumber);
            if (string.IsNullOrWhiteSpace(pEmployee.PhoneNumber) || pEmployee.PhoneNumber.Length > Constants.DBConfig.EmployeePhoneNumberMaxLength)
                throw new Exceptions.Core.InvalidFormField("Phone number");

            if (!Common.Validators.IsValidEmailAddress(pEmployee.Email))
                throw new Exceptions.Core.InvalidFormField("Bad email address");

            // Validate address fields
            if (pEmployee.Address == null)
                throw new ArgumentNullException(nameof(pEmployee.Address));

            if (string.IsNullOrWhiteSpace(pEmployee.Address.AddressLine1))
                throw new Exceptions.Core.InvalidFormField("Address 1");

            if (string.IsNullOrWhiteSpace(pEmployee.Address.City) || pEmployee.Address.City.Length > Constants.DBConfig.AddressCityMaxLength)
                throw new Exceptions.Core.InvalidFormField("City");

            if (string.IsNullOrWhiteSpace(pEmployee.Address.State) || pEmployee.Address.State.Length > Constants.DBConfig.AddressStateMaxLength)
                throw new Exceptions.Core.InvalidFormField("State");

            if (string.IsNullOrWhiteSpace(pEmployee.Address.PostalCode) || pEmployee.Address.PostalCode.Length > Constants.DBConfig.AddressPostalCodeMaxLength)
                throw new Exceptions.Core.InvalidFormField("Postal code");

            if (string.IsNullOrWhiteSpace(pEmployee.Address.CountryCode) || pEmployee.Address.CountryCode.Length > Constants.DBConfig.AddressCountryCodeMaxLength)
                throw new Exceptions.Core.InvalidFormField("Country");

            // Validate dependents
            if (pEmployee.Dependents != null)
            {
                foreach (var Dependent in pEmployee.Dependents)
                {
                    if (string.IsNullOrWhiteSpace(Dependent.FirstName))
                        throw new Exceptions.Core.InvalidFormField($"Dependent first name '{Dependent.FirstName}'");

                    if (string.IsNullOrWhiteSpace(Dependent.FirstName))
                        throw new Exceptions.Core.InvalidFormField($"Dependent last name '{Dependent.LastName}'");
                }
            }
        }

        #endregion Create/Update/Delete
    }
}
