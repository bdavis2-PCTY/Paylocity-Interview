using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Used to provide a summary of an employee's benefits
    /// </summary>
    public class BenefitSummary
    {
        /// <summary>
        /// Employee the benefits are associated with 
        /// </summary>
        public DTO.Employee Employee { get; private set; }

        /// <summary>
        /// Deductions included with the benefits
        /// </summary>
        public List<DTO.BenefitDeduction> Deductions { get; private set; }

        /// <summary>
        /// Amount of deductions annually after discounts
        /// </summary>
        public double AnnualNetDeductions
        {
            get => Deductions.Sum(x => x.AnnualNetCost);
        }

        /// <summary>
        /// Employee's net annual salary (after deductions)
        /// </summary>
        public double AnnualNetSalary
        {
            get => Employee.GrossAnnualSalary - Deductions.Sum(x => x.AnnualNetCost);
        }

        /// <summary>
        /// Amount of deductions per paycheck
        /// </summary>
        public double NetPaycheckDeductions
        {
            get => (AnnualNetDeductions / 26d);     // 26 paycheck/year
        }

        /// <summary>
        /// Net paycheck (after deductions)
        /// </summary>
        public double PaycheckNet
        {
            get => (AnnualNetSalary / 26d);         // 26 paycheck/year
        }

        public BenefitSummary(DTO.Employee pEmployee, List<DTO.BenefitDeduction> pCharges)
        {
            Employee = pEmployee;
            Deductions = pCharges;
        }
    }
}
