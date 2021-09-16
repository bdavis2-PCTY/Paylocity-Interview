/**
 * Interacts with the Home controller
 */
namespace Paylocity.Interview.Web.Scripts.Controllers {

    /**
     * Provides base functionality for interacting with controllers
     */
    abstract class BaseController {
        private readonly _baseUrl: string;

        public constructor(pControllerName: string) {
            // Build the base route/URL of the controller
            this._baseUrl = `${Scripts.Helpers.Utility.getSiteUrl()}/${pControllerName}`;
        }

        /**
         * Submits a POST request to a controller using AJAX and returns the HTML
         * @param pViewName
         * @param pParams
         */
        public postHtmlAsync(pViewName: string, pParams?: object): JQueryPromise<string> {
            const url = `${this._baseUrl}/${pViewName}`;

            const ajaxSettings: JQueryAjaxSettings = {
                url: url,
                type: "POST",
            };

            // Add any additional parameters (if needed)
            if (pParams) {
                ajaxSettings.data = pParams;
            }

            return $.ajax(ajaxSettings)
                .fail(reply => console.error("AJAX call failed for loading a controller! URL:" + url, reply));
        }
    }

    /**
     * HomeController Mappings
     * BaseURL: [URL]/Home/
     */
    class HomeController extends BaseController {
        public constructor() {
            super('Home');
        }

        public benefitSummaryAsync(pEmployee: Interfaces.Core.IEmployee): JQueryPromise<string> {
            const params = {
                pEmployee: pEmployee
            };

            return super.postHtmlAsync('BenefitSummary', params);
        }
    }

    // Exports
    export const Home = new HomeController();
}
