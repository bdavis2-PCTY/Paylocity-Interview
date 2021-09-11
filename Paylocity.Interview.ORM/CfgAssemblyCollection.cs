using System.Configuration;

namespace Paylocity.Interview.ORM
{
    internal class CfgAssemblyCollection : ConfigurationElementCollection
    {
        public CfgAssembly this[int index]
        {
            get { return (CfgAssembly)base.BaseGet(index); }
            set
            {
                if (base.BaseGet(index) != null)
                {
                    base.BaseRemoveAt(index);
                }
                this.BaseAdd(index, value);
            }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new CfgAssembly();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((CfgAssembly)element).Assembly;
        }
    }
}
