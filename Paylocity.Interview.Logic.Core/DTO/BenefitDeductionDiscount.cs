namespace Paylocity.Interview.Logic.Core.DTO
{
    public class BenefitDeductionDiscount
    {
        /// <summary>
        /// The percentage of the original total that is taken removed
        /// </summary>
        public double DiscountPercentage { get; private set; }

        /// <summary>
        /// Reason for the discount
        /// </summary>
        public string Reason { get; private set; }

        public BenefitDeductionDiscount(double pDiscountPercentage, string pReason)
        {
            DiscountPercentage = pDiscountPercentage;
            Reason = pReason;
        }
    }
}
