using System;
using NHibernate;

namespace Paylocity.Interview.ORM
{
    public class NHibernateFactory : IDisposable
    {
        static log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private static readonly ISessionFactory _SessionFactory;
        private ISession _NHSession;

        static NHibernateFactory()
        {
            Configuration ConfigSettings = (Configuration)System.Configuration.ConfigurationManager.GetSection("hibernateConfiguration");

            Log.Warn("NHibernate Configuration [connectionStringName] = " + ConfigSettings.ConnectionStringName);
            Log.Warn("NHibernate Configuration [showSql] = " + ConfigSettings.ShowSql);

            string ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings[ConfigSettings.ConnectionStringName].ConnectionString;
            Log.Warn("NHibernate Configuration [Connection String Value] = " + ConnectionString);

            foreach (CfgAssembly MapAssembly in ConfigSettings.MappingAssemblies)
            {
                Log.Warn("NHibernate Configuration [assembly] = " + MapAssembly.Assembly);
            }

            var NHConfiguration = FluentNHibernate.Cfg.Fluently.Configure();

            if (ConfigSettings.ShowSql.ToUpper() == "TRUE")
            {
                NHConfiguration = NHConfiguration.Database(FluentNHibernate.Cfg.Db.MsSqlConfiguration.MsSql2008.ConnectionString(ConnectionString).ShowSql);
            }
            else
            {
                NHConfiguration = NHConfiguration.Database(FluentNHibernate.Cfg.Db.MsSqlConfiguration.MsSql2008.ConnectionString(ConnectionString));
            }

            NHConfiguration = NHConfiguration.Mappings(m =>
                    {
                        foreach (CfgAssembly MapAssembly in ConfigSettings.MappingAssemblies)
                        {
                            m.FluentMappings.AddFromAssembly(System.Reflection.Assembly.Load(MapAssembly.Assembly));
                        }
                    });

            _SessionFactory = NHConfiguration.BuildSessionFactory();
        }

        public NHibernateFactory()
        {
            _NHSession = _SessionFactory.OpenSession();
        }

        public void Dispose()
        {
            this.Dispose(true);
        }

        protected virtual void Dispose(bool disposeManaged)
        {
            if (disposeManaged)
            {
                if (_NHSession != null)
                {
                    if (_NHSession.IsOpen)
                    {
                        _NHSession.Close();
                    }
                    _NHSession = null;
                }
            }
        }

        public ISession Session
        {
            get
            {
                return _NHSession;
            }
        }

    }
}

