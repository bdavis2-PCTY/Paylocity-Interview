using NHibernate;

namespace Paylocity.Interview.Logic.Core
{
    /// <summary>
    /// Base functionality of an API
    /// </summary>
    public abstract class BaseAPI
    {
        protected ISession NHSession { get; private set; }

        public BaseAPI(ISession pNHSession)
        {
            NHSession = pNHSession;
        }
    }
}
