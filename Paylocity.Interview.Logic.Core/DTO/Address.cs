using System;

namespace Paylocity.Interview.Logic.Core.DTO
{
    /// <summary>
    /// Provides all details of an address
    /// Javascript: Paylocity.Interview.Web.Scripts.Interfaces.Core.IAddress
    /// </summary>
    public class Address
    {
        public Guid Guid { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }

        public Address()
        {
        }

        public Address(Guid pGuid, string pAddressLine1, string pAddressLine2, string pCity, string pState, string pPostalCode, string pCountryCode)
        {
            Guid = pGuid;
            AddressLine1 = pAddressLine1;
            AddressLine2 = pAddressLine2;
            City = pCity;
            State = pState;
            PostalCode = pPostalCode;
            CountryCode = pCountryCode;
        }

        internal Address(DB.Address pAddress)
        {
            // Do not allow null
            if (pAddress == null)
            {
                throw new ArgumentNullException(nameof(pAddress));
            }

            Guid = pAddress.Guid;
            AddressLine1 = pAddress.AddressLine1;
            AddressLine2 = pAddress.AddressLine2;
            City = pAddress.City;
            State = pAddress.State;
            PostalCode = pAddress.PostalCode;
            CountryCode = pAddress.CountryCode;
        }
    }
}
