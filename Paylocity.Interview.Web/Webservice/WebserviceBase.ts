namespace Paylocity.Interview.Web.Webservice {
    /**
     * Base functionality for RESTful webservices
     */
    export abstract class WebserviceBase {
        /**
         * The base URL for the webservice:
         * EX: http://localhost/Paylocity-Interview/Webservice/Employee.asmx
         */
        private readonly _baseUrl: string = null;

        public constructor(pWebserviceName: string) {
            this._baseUrl = `${Scripts.Helpers.Utility.getSiteUrl()}/Webservice/${pWebserviceName}`;
        }

        /**
         * Submits a POST request to a webservice
         * Returns the JSON response as a promise
         * @param pMethodName
         * @param params
         */
        protected postAsync(pMethodName: string, params?: object): JQueryPromise<any> {
            const ajaxSettings: JQueryAjaxSettings = {
                url: `${this._baseUrl}/${pMethodName}`,
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            };

            // Add any additional parameters (if needed)
            if (params) {
                ajaxSettings.data = JSON.stringify(params);
            }

            Scripts.Controls.Spinner.increase();
            const ajaxPromise = $.ajax(ajaxSettings).then(response => {
                // Parse and return response
                try {
                    return JSON.parse(response.d);
                } catch {
                    return response.d;
                }
            })
                .fail(reply => console.error("AJAX call failed!", reply))
                .always(() => Scripts.Controls.Spinner.decrease());

            return ajaxPromise;
        }
    }
}
