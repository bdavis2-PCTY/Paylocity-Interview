/**
 * Interacts with the Home controller
 */
namespace Paylocity.Interview.Web.Controllers {
    abstract class BaseController {
        private readonly _baseUrl: string;

        public constructor(pControllerName: string) {
            this._baseUrl = `${Scripts.Helpers.Utility.getSiteUrl()}/${pControllerName}`;
        }

        public postHtmlAsync(pViewName: string, pParams?: object): JQueryPromise<string> {
            const ajaxSettings: JQueryAjaxSettings = {
                url: `${this._baseUrl}/${pViewName}`,
                type: "POST",
            };

            // Add any additional parameters (if needed)
            if (pParams) {
                ajaxSettings.data = pParams;
            }

            return $.ajax(ajaxSettings)
                .fail(reply => console.error("AJAX call failed!", reply));
        }
    }

    /**
     * Home Controller Mappings
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
