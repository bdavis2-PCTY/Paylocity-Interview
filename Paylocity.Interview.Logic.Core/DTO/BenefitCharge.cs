using System.Collections.Generic;
using System.Linq;

namespace Paylocity.Interview.Logic.Core.DTO
{
    public class BenefitCharge
    {
        public double BaseCost { get; set; }
        public string ChargeReason { get; set; }
        public List<BenefitDiscount> Discounts { get; set; }

        /// <summary>
        /// Returns the billed amount for the charge
        /// Base cost minus the discounts
        /// </summary>
        public double Cost
        {
            get => BaseCost * (1 - Discounts.Sum(x => x.DiscountPercentage));
        }

        public BenefitCharge(double pBaseCost, string pChargeReason, List<BenefitDiscount> pDiscounts)
        {
            BaseCost = pBaseCost;
            ChargeReason = pChargeReason;
            Discounts = pDiscounts;
        }
    }
}
