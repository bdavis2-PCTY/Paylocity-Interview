using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core.DTO
{
    public class BenefitDeduction
    {
        /// <summary>
        /// Cost of the deduction per year before discounts
        /// </summary>
        public double GrossAnnualCost { get; private set; }

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
        public double NetAnnualCost
        {
            get => GrossAnnualCost * (1 - Discounts.Sum(x => x.DiscountPercentage));
        }

        public BenefitDeduction(double pBaseCost, string pChargeReason, List<BenefitDeductionDiscount> pDiscounts)
        {
            GrossAnnualCost = pBaseCost;
            Reason = pChargeReason;
            Discounts = pDiscounts;
        }
    }
}
