namespace Paylocity.Interview.Logic.Core.DTO
{
    public class BenefitDiscount
    {
        /// <summary>
        /// The percentage of the original total that is taken removed
        /// </summary>
        public double DiscountPercentage { get; set; }

        /// <summary>
        /// Reason for the discount
        /// </summary>
        public string Reason { get; set; }

        public BenefitDiscount(double pDiscountPercentage, string pReason)
        {
            DiscountPercentage = pDiscountPercentage;
            Reason = pReason;
        }
    }
}
