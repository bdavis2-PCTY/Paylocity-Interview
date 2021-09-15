using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core.DTO
{
    public class EmployeeBenefitSummary
    {
        public DTO.Employee Employee { get; private set; }
        public List<DTO.BenefitDeduction> Deductions { get; private set; }

        /// <summary>
        /// Amount of deductions annually after discounts
        /// </summary>
        public double NetAnnualDeductions
        {
            get => Deductions.Sum(x => x.NetAnnualCost);
        }

        /// <summary>
        /// Employee's net annual salary (after deductions)
        /// </summary>
        public double NetAnnualSalary
        {
            get => Employee.GrossAnnualSalary - Deductions.Sum(x => x.NetAnnualCost);
        }

        /// <summary>
        /// Amount of deductions per paycheck
        /// </summary>
        public double NetPaycheckDeductions
        {
            get => (NetAnnualDeductions / 26d);     // 26 paycheck/year
        }

        /// <summary>
        /// Net paycheck (after deductions)
        /// </summary>
        public double NetPaycheck
        {
            get => (NetAnnualSalary / 26d);         // 26 paycheck/year
        }

        public EmployeeBenefitSummary(DTO.Employee pEmployee, List<DTO.BenefitDeduction> pCharges)
        {
            Employee = pEmployee;
            Deductions = pCharges;
        }
    }
}
