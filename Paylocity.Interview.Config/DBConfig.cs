namespace Paylocity.Interview.Config
{
    /// <summary>
    /// Allows access to application-level configuration values
    /// </summary>
    public static class DBConfig
    {
        #region Core.Employee

        /// <summary>
        /// Max length of Core.Employee.PhoneNumber determined by database schema
        /// </summary>
        public static int EmployeePhoneNumberMaxLength { get; } = 15;

        #endregion 

        #region Core.Address

        /// <summary>
        /// Max length of Core.Address.City determined by database schema
        /// </summary>
        public static int AddressCityMaxLength { get; } = 250;

        /// <summary>
        /// Max length of Core.Address.State determined by database schema
        /// </summary>
        public static int AddressStateMaxLength { get; } = 250;

        /// <summary>
        /// Max length of Core.Address.PostalCode determined by database schema
        /// </summary>
        public static int AddressPostalCodeMaxLength { get; } = 250;

        /// <summary>
        /// Max length of Core.Address.CountryCode determined by database schema
        /// </summary>
        public static int AddressCountryCodeMaxLength { get; } = 2;

        #endregion

    }
}
