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
         * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
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

        /**
         * Removes HTML from a string
         * Replaces tags with codes
         * @param pString
         */
        public static escapeHtml(pString: string): string {
            if (!pString) {
                return pString;
            }

            pString = this.replaceAll(pString, '<', '&lt;');
            pString = this.replaceAll(pString, '>', '&gt;');
            return pString;
        }

        /**
         * Replaces all instance of a string within a string with another string
         * String.prototype.replaceAll is not supported by all browsers which makes this necessary
         * @param pString       The original string
         * @param pReplace      String that needs to be replaced
         * @param pReplaceWith  What to replace pReplace with
         */
        public static replaceAll(pString: string, pReplace: string, pReplaceWith: string): string {
            if (!pString) {
                return pString;
            }

            return pString.split(pReplace).join(pReplaceWith);
        }
    }
}
