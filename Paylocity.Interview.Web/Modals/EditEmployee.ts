namespace Paylocity.Interview.Web.Modals {
    interface IEmployeeFormValues {
        firstName: string;
        lastName: string;
        email: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    }

    /**
     * modal for editing an employee
     */
    class EditEmploiyeeModal extends BaseModal {
        private _employeeGuid: string;
        private _onSaveCallback: () => void;
        private _dependentManager: DependentManager;

        private $form: $;

        public constructor() {
            super("EditEmployee");
        }

        protected initModal(): void {
            // Initialize SemanticUI forms
            this.$form = $('.ui.form', this.$modal).form({
                fields: {
                    firstName: { identifier: 'firstName', rules: [{ type: 'empty', prompt: 'Provide a first name' }] },
                    lastName: { identifier: 'lastName', rules: [{ type: 'empty', prompt: 'Provide a last name' }] },
                    email: { identifier: 'email', rules: [{ type: 'email', prompt: 'Provide a valid email address' }] },
                    address1: { identifier: 'address1', rules: [{ type: 'empty', prompt: 'Provide an address' }] },
                    address2: { identifier: 'address2', rules: [] },
                    city: { identifier: 'city', rules: [{ type: 'empty', prompt: 'Provide a city' }] },
                    state: { identifier: 'state', rules: [{ type: 'empty', prompt: 'Select a state' }] },
                    postalCode: { identifier: 'postalCode', rules: [{ type: 'empty', prompt: 'Provide a postal code' }] },
                    country: { identifier: 'country', rules: [{ type: 'empty', prompt: 'Select a country' }] },
                }
            });

            // Load states/countries into address dropdowns
            Scripts.Helpers.Form.setDropdownStates($(this.$form.form('get field', 'state')).parent());
            Scripts.Helpers.Form.setDropdownCountries($(this.$form.form('get field', 'country')).parent());
            $('.ui.dropdown', this.$modal).dropdown();

            // Prevent modal closing before data is validated/saved
            this.$modal.modal({
                closable: false,
                onApprove: () => {
                    if (this.isFormValid()) {
                        // Run save callback
                        if (this._onSaveCallback) {
                            this._onSaveCallback();
                        }
                    }
                    return false;
                }
            });

            this._dependentManager = new DependentManager(this.$modal);
        }

        /**
         * Loads and shows the modal.
         * Also loads existing employee data into the form if editing an existing employee.
         * @param pEmployeeGuid     The GUID of the employee to edit. Use NULL for employee creation.
         * @param pOnSaveCallback   The callback function when the employee is saved/updated.
         */
        public show(pEmployeeGuid: string, pOnSaveCallback: () => void): JQueryPromise<void> {
            this.reset();
            this._employeeGuid = pEmployeeGuid;
            this._onSaveCallback = pOnSaveCallback;

            return this.loadModalAsync()
                .then(() => {
                    // Load employee data if editing an existing user
                    if (this._employeeGuid) {
                        return this.loadEmployeeData();
                    }
                })
                .then(() => this.showModal())
                .fail(console.log);
        }

        /**
         * Resets the form and all instance properties to default values
         */
        private reset(): void {
            this._onSaveCallback = null;
            this._employeeGuid = null;

            if (this.$form) {
                this.$form.form('clear');
            }
        }

        /**
         * Validates the form to ensure user input is acceptable
         * Returns TRUE when the form is valid
         * Returns FALSE when the form is not valid
         */
        private isFormValid(): boolean {
            this.$form.form('validate form');
            if (this.$form.form('is valid')) {
                return true;
            }

            return false;
        }

        private loadEmployeeData(): JQueryPromise<void> {
            return Webservice.Employee.getEmployeeAsync(this._employeeGuid).then(employee => {
                const formValues: IEmployeeFormValues = {
                    firstName: employee.FirstName,
                    lastName: employee.LastName,
                    email: employee.Email,

                    // Address can be null if nothing was entered
                    address1: employee.Address?.AddressLine1 || '',
                    address2: employee.Address?.AddressLine2 || '',
                    city: employee.Address?.City || '',
                    state: employee.Address?.State || '',
                    postalCode: employee.Address?.PostalCode || '',
                    country: employee.Address?.CountryCode || '',
                };

                this.$form.form('set values', formValues);
                this._dependentManager.setDependents(employee.Dependents);
            });
        }
    }

    class DependentManager {

        private _dependents: Interfaces.Core.IDependent[];
        private readonly $uiDepedentList: $;

        public constructor($pModal: $) {
            this._dependents = [];
            this.$uiDepedentList = $("#uiDepdendentsList", $pModal).DataTable({
                columns: [
                    {
                        title: "First Name",
                        data: "FirstName"
                    },
                    {
                        title: "Last Name",
                        data: "LastName"
                    }
                ],

                language: {
                    zeroRecords: "No Dependents Claimed",
                    processing: "Processing"
                }
            });
        }

        public reset(): void {
            this._dependents = [];
            this.$uiDepedentList.clear().draw();
        }

        public getDependents(): Interfaces.Core.IDependent[] {
            return this._dependents;
        }

        public setDependents(pDependents: Interfaces.Core.IDependent[]): void {
            this._dependents = pDependents;
            this.$uiDepedentList.clear().rows.add(this._dependents).draw();
        }
    }

    export const EditEmployee = new EditEmploiyeeModal();
}
