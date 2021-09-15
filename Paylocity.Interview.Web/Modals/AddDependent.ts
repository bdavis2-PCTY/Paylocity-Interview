namespace Paylocity.Interview.Web.Modals {

    export interface IDependentFormValues {
        firstName: string;
        lastName: string;
    }

    /**
     * modal for editing an employee
     */
    class AddDependentModal extends BaseModal {
        private _onSaveCallback: (dependent: IDependentFormValues) => void;

        private $form: $;

        public constructor() {
            super("AddDependent");
        }

        protected initModal(): void {
            // Initialize SemanticUI forms
            this.$form = $('.ui.form', this.$modal).form({

                onSuccess: () => this.onFormSubmit(),

                fields: {
                    firstName: { identifier: 'firstName', rules: [{ type: 'empty', prompt: 'Provide a first name' }] },
                    lastName: { identifier: 'lastName', rules: [{ type: 'empty', prompt: 'Provide a last name' }] }
                }
            });

            // Prevent modal closing before data is validated/saved
            this.$modal.modal({
                closable: false,
                allowMultiple: true,
                onApprove: () => {
                    // Attempt to trigger 'onSuccess' to trigger validation/callbacks
                    this.$form.form('validate form');
                    return false;
                }
            });
        }

        /**
         * Loads and shows the modal.
         * Also loads existing employee data into the form if editing an existing employee.
         * @param pOnSaveCallback   The callback function when the employee is saved/updated.
         */
        public show(pOnSaveCallback: (dependent: IDependentFormValues) => void): JQueryPromise<void> {
            this.reset();
            this._onSaveCallback = pOnSaveCallback;

            return this.loadModalAsync()
                .then(() => this.showModal())
                .fail(console.log);
        }

        /**
         * Resets the form and all instance properties to default values
         */
        private reset(): void {
            this._onSaveCallback = null;

            if (this.$form) {
                this.$form.form('clear');
            }
        }

        /**
         * Called when the form is submitted
         * Validates the form and runs the callback
         */
        private onFormSubmit(): boolean {
            console.log('on submitting');

            if (!this.$form.form('is valid')) {
                return false;
            }

            this.hideModal();

            // Run callback
            if (this._onSaveCallback) {
                const formValues: IDependentFormValues = this.$form.form('get values');
                this._onSaveCallback(formValues);
            }
             
            return false;
        }
    }

    export const AddDependent = new AddDependentModal();
}
