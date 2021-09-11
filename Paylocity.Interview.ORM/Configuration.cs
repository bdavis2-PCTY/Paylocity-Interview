using System.Configuration;

namespace Paylocity.Interview.ORM
{
    internal class Configuration : ConfigurationSection
    {
        [ConfigurationProperty("mappingAssemblies")]
        public CfgAssemblyCollection MappingAssemblies
        {
            get { return (CfgAssemblyCollection)this["mappingAssemblies"]; }
        }

        [ConfigurationProperty("showSql", IsRequired = true)]
        public string ShowSql
        {
            get { return (string)this["showSql"]; }
        }

        [ConfigurationProperty("connectionStringName", IsRequired = true)]
        public string ConnectionStringName
        {
            get { return (string)this["connectionStringName"]; }
        }
    }
}
