using FluentNHibernate.Mapping;

namespace Paylocity.Interview.Logic.Core.DB.Mappings
{
    internal class EmployeeMap : ClassMap<Employee>
    {
        public EmployeeMap()
        {
            Table("Core.Employee");
            Id(x => x.Id).Column("Id").GeneratedBy.Identity();
            Map(x => x.Guid).Column("Guid").Not.Nullable();
            Map(x => x.FirstName).Column("FirstName").Not.Nullable();
            Map(x => x.LastName).Column("LastName").Not.Nullable();
            Map(x => x.Email).Column("Email").Not.Nullable();
            Map(x => x.PhoneNumber).Column("PhoneNumber").Not.Nullable();
            Map(x => x.PrimaryAddressGuid).Column("PrimaryAddressGuid").Not.Nullable();
            Map(x => x.CreatedDateTime).Column("CreatedDateTime").Not.Nullable().Not.Update();
            Map(x => x.IsActive).Column("IsActive").Not.Nullable();
        }
    }
}
