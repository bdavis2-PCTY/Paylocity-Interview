namespace Paylocity.Interview.Web.Scripts.Helpers {
    /**
     * General utility/helper functions
     */
    export class Utility {
        private static _siteUrl: string;

        /**
         * Gets the base URL for the website
         */
        public static getSiteUrl(): string {
            this._siteUrl = this._siteUrl || $("#uiSiteUrl").val();
            return this._siteUrl;
        }
    }
}
