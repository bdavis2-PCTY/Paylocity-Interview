namespace Paylocity.Interview.Web.Scripts.Controls {

    /**
     * Spinner control that overlays the entire page to indicate something is loading
     * Generally used for async calls
     */
    class SpinnerControl {
        private _count: number;
        private $uiSpinner: $;

        public constructor() {
            this._count = 0;
            this.$uiSpinner = $("#uiGlobalSpinner");
        }

        /**
         * Shows the spinner
         */
        public increase(): void {
            this._count++;
            this.updateDisplay();
        }

        /**
         * Hides the spinner
         */
        public decrease(): void {
            this._count--;
            this.updateDisplay();
        }

        /**
         * Toggles the spinner's visibility based on if it should be shown or not
         */
        private updateDisplay(): void {
            this.$uiSpinner.toggleClass('active', this._count > 0);
        }
    }

    export const Spinner = new SpinnerControl();
}
