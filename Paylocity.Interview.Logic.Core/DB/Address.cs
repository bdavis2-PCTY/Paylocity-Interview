using System;

namespace Paylocity.Interview.Logic.Core.DB
{
    /// <summary>
    /// Represents an Address database object
    /// </summary>
    internal class Address
    {
        public virtual int Id { get; protected internal set; }
        public virtual Guid Guid { get; protected internal set; }
        public virtual string AddressLine1 { get; protected internal set; }
        public virtual string AddressLine2 { get; protected internal set; }
        public virtual string City { get; protected internal set; }
        public virtual string State { get; protected internal set; }
        public virtual string PostalCode { get; protected internal set; }
        public virtual string CountryCode { get; protected internal set; }

        protected Address()
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
    }
}
