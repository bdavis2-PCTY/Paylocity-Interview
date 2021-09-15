using FluentNHibernate.Mapping;

namespace Paylocity.Interview.Logic.Core.DB.Mappings
{
    internal class AddressMap : ClassMap<Address>
    {
        public AddressMap()
        {
            Table("Core.Address");
            Id(x => x.Id).Column("Id").GeneratedBy.Identity();
            Map(x => x.Guid).Column("Guid").Not.Nullable();
            Map(x => x.AddressLine1).Column("AddressLine1").Not.Nullable();
            Map(x => x.AddressLine2).Column("AddressLine2").Not.Nullable();
            Map(x => x.City).Column("City").Not.Nullable().Length(250);
            Map(x => x.State).Column("State").Not.Nullable().Length(250);
            Map(x => x.PostalCode).Column("PostalCode").Not.Nullable().Length(250);
            Map(x => x.CountryCode).Column("CountryCode").Not.Nullable().Length(2);
            Map(x => x.EmployeeGuid).Column("EmployeeGuid").Not.Nullable();
        }
    }
}
