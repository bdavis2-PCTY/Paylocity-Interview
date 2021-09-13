using FluentNHibernate.Mapping;

namespace Paylocity.Interview.Logic.Core.DB.Mappings
{
    internal class DependentMap : ClassMap<Dependent>
    {
        public DependentMap()
        {
            Table("Core.Dependent");
            Id(x => x.Id).Column("Id").GeneratedBy.Identity();
            Map(x => x.Guid).Column("Guid").Not.Nullable();
            Map(x => x.FirstName).Column("FirstName").Not.Nullable();
            Map(x => x.LastName).Column("LastName").Not.Nullable();
            Map(x => x.EmployeeGuid).Column("EmployeeGuid").Not.Nullable();
            Map(x => x.CreatedDateTime).Column("CreatedDateTime").Not.Nullable();
        }
    }
}
