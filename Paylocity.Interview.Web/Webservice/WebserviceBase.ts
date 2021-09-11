namespace Paylocity.Interview.Web.Webservice {

    /**
     * Base functionality for RESTful webservices
     */
    export abstract class WebserviceBase {

        /**
         * The base URL for the webservice:
         * EX: http://localhost/Paylocity-Interview/Webservice/EmployeeLink.asmx
         */
        private readonly _baseUrl: string = null;

        public constructor(pWebserviceName: string) {
            this._baseUrl = pWebserviceName;
        }
    }
}