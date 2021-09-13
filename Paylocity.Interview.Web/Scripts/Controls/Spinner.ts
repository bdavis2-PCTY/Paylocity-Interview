namespace Paylocity.Interview.Web.Scripts.Controls {
    class SpinnerControl {
        private _count: number;
        private $uiSpinner: $;

        public constructor() {
            this._count = 0;
            this.$uiSpinner = $("#uiGlobalSpinner");
        }

        public increase(): void {
            this._count++;
            this.updateDisplay();
        }

        public decrease(): void {
            this._count--;
            this.updateDisplay();
        }

        private updateDisplay(): void {
            console.log('spinner count', this._count);
            this.$uiSpinner.toggleClass('active', this._count > 0);
        }
    }

    export const Spinner = new SpinnerControl();
}
