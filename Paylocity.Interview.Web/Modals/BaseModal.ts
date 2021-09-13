namespace Paylocity.Interview.Web.Modals {
    /**
     * Base implementation for lazy loading modal windows
     */
    export abstract class BaseModal {
        /**
         * URL of where to load the modal HTML from
         */
        private readonly _modalUrl: string;

        /**
         * jQuery instance of the loaded modal
         */
        private _$modal: $;

        /**
         * Getter for the jQuery modal object
         * Allows derived classes to access the modal without setting it
         */
        protected get $modal(): $ {
            return this._$modal;
        }

        public constructor(pModalname: string) {
            // Builds the URL of where to load the modal
            // EX. http://localhost/PaylocityInterview/Modal/EditEmployee
            this._modalUrl = `${Scripts.Helpers.Utility.getSiteUrl()}/Modal/${pModalname}`;
        }

        protected loadModalAsync(): JQueryPromise<void> {
            // Check if the modal's HTML has already been loaded
            // If so, just continue execution
            if (this._$modal) {
                var promise = $.Deferred<void>().resolve();
                return promise.promise();
            }

            const ajaxSettings: JQueryAjaxSettings = {
                url: this._modalUrl,
                type: 'GET',
                dataType: 'html'
            };

            Scripts.Controls.Spinner.increase();
            return $.ajax(ajaxSettings).then(modalHtml => {
                this._$modal = $(modalHtml).modal({
                    closable: false
                });

                $('.ui.modals.dimmer').append(this._$modal);
                this._$modal.modal('refresh');
            })
                .then(() => this.initModal())
                .fail(error => console.error("Failed to load from " + this._modalUrl, error))
                .always(() => Scripts.Controls.Spinner.decrease());
        }

        protected showModal(): void {
            // Ensure the modal's HTML has been loaded
            if (!this.$modal) {
                throw "The modal needs to be loaded before showing it";
            }

            this.$modal.modal('show');
        }

        protected abstract initModal(): JQueryPromise<any> | void;
    }
}
