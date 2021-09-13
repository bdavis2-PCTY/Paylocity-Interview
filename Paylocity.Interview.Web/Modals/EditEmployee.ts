namespace Paylocity.Interview.Web.Modals {
    /**
     * modal for editing an employee
     */
    class EditEmploiyeeModal extends BaseModal {
        private _employeeGuid: string;
        private $form: $;

        public constructor() {
            super("EditEmployee");
        }

        protected initModal(): void {
            this.$form = $('.ui.form', this.$modal).form({
                fields: {
                    firstName: { identifier: 'firstName', rules: [{ type: 'empty', prompt: 'Provide a first name' }] },
                    lastName: { identifier: 'lastName', rules: [{ type: 'empty', prompt: 'Provide a last name' }] },
                    email: { identifier: 'email', rules: [{ type: 'email', prompt: 'Provide a valid email address' }] },
                    state: { identifier: 'state', rules: [{ type: 'empty', prompt: 'Select a state' }] },
                    country: { identifier: 'country', rules: [{ type: 'empty', prompt: 'Select a country' }] },
                }
            });

            Scripts.Helpers.Form.setDropdownStates($(this.$form.form('get field', 'state')).parent());
            Scripts.Helpers.Form.setDropdownCountries($(this.$form.form('get field', 'country')).parent());
            $('.ui.dropdown', this.$modal).dropdown();
        }

        public show(pEmployeeGuid: string): JQueryPromise<void> {
            this._employeeGuid = pEmployeeGuid;

            return this.loadModalAsync()
                .then(() => this.showModal());
        }
    }

    export const EditEmployee = new EditEmploiyeeModal();
}
