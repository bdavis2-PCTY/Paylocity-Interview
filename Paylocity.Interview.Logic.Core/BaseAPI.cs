using NHibernate;
using System;

namespace Paylocity.Interview.Logic.Core
{
    /// <summary>
    /// Base functionality of an API
    /// </summary>
    public abstract class BaseAPI
    {
        private log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// Access to database connection
        /// </summary>
        protected ISession NHSession { get; private set; }

        public BaseAPI(ISession pNHSession)
        {
            NHSession = pNHSession;
        }

        protected void ErrorHandler(Exception ex)
        {
            // TODO: Implement better error handling
            Log.Error(ex);
        }
    }
}
