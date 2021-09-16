using HtmlBuilders;
using System.Web.Mvc;

namespace Paylocity.Interview.Web.Extensions
{
    /// <summary>
    /// Extension methods for an HtmlHelper
    /// </summary>
    public static class HtmlHelperExtensions
    {
        /// <summary>
        /// Creates a Save and Cancel button for a SemanticUI modal
        /// </summary>
        /// <param name="pHtmlHelper"></param>
        /// <param name="pSaveButtonText"></param>
        /// <param name="pSaveButtonIcon"></param>
        /// <param name="pCancelButtonText"></param>
        /// <param name="pCancelButtonIcon"></param>
        /// <returns></returns>
        public static MvcHtmlString ModalSaveCloseButtons(this HtmlHelper pHtmlHelper, string pSaveButtonText = "Save", string pSaveButtonIcon = "save", string pCancelButtonText = "Cancel", string pCancelButtonIcon = "remove")
        {
            var Save = GetActionButton(pSaveButtonText, pSaveButtonIcon, "green approve");
            var Cancel = GetActionButton(pCancelButtonText, pCancelButtonIcon, "red deny");
            return MvcHtmlString.Create($"{Save}{Cancel}");
        }

        /// <summary>
        /// Builds a base SemanticUI button
        /// </summary>
        /// <param name="pButtonText"></param>
        /// <param name="pIconName"></param>
        /// <param name="pAdditionalClasses"></param>
        /// <returns></returns>
        private static HtmlTag GetActionButton(string pButtonText, string pIconName, params string[] pAdditionalClasses)
        {
            // Create button tag
            var Button = new HtmlTag("div");
            Button.Class("ui left labeled icon button");

            if (pAdditionalClasses.Length > 0)
            {
                Button.Class(string.Join(",", pAdditionalClasses));
            }

            // Inject icon
            Button.Append(new HtmlTag("i").Class(pIconName).Class("icon"));

            // Button Text
            Button.Append(pButtonText);

            return Button;
        }
    }
}
