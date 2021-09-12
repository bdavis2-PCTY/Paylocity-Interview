using System.Web.Optimization;

namespace Paylocity.Interview.Web
{
    /// <summary>
    /// A StyleBundle that will automatically apply the LESS transformer
    /// </summary>
    public class CustomStyleBundle : StyleBundle
    {
        public CustomStyleBundle(string pBundleName, params string[] files)
            : base(pBundleName)
        {
            // Allow LESS files to be transformed to CSS
            base.Transforms.Add(new LessTransform());

            // Add files passed in
            base.Include(files);

        }
    }
}