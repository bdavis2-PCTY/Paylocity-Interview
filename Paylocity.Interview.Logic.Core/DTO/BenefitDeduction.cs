using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Represents a deduction part of a benefit
    /// </summary>
    public class BenefitDeduction
    {
        /// <summary>
        /// Cost of the deduction per year before discounts
        /// </summary>
        public double AnnualGrossCost { get; private set; }

        /// <summary>
        /// Reason for the deduction
        /// </summary>
        public string Reason { get; private set; }

        /// <summary>
        /// Deduction discounts
        /// </summary>
        public List<BenefitDeductionDiscount> Discounts { get; private set; }

        /// <summary>
        /// Original annual cost of the deduction minus the discounts
        /// </summary>
        public double AnnualNetCost
        {
            get => AnnualGrossCost * (1 - Discounts.Sum(x => x.DiscountPercentage));
        }

        public BenefitDeduction(double pAnnualGrossCost, string pChargeReason, List<BenefitDeductionDiscount> pDiscounts)
        {
            AnnualGrossCost = pAnnualGrossCost;
            Reason = pChargeReason;
            Discounts = pDiscounts;
        }
    }
}
