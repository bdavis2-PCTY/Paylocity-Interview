using System.Configuration;

namespace Paylocity.Interview.ORM
{
    internal class CfgAssembly : ConfigurationElement
    {
        [ConfigurationProperty("assembly", IsRequired = false)]
        public string Assembly { get { return (string)this["assembly"]; } }
    }
}
