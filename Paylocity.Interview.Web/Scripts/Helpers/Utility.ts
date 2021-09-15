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

        /**
         * Generates and returns a new guid value (Guid.NewGuid())
         */
        public static newGuid(): string {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        /**
         * Returns the value of an empty guid (Guid.Empty)
         */
        public static getEmptyGuid(): string {
            return '00000000-0000-0000-0000-000000000000';
        }
    }
}
