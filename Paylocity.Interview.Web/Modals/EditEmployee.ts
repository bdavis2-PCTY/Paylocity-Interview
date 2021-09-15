namespace Paylocity.Interview.Web.Modals {

    /**
     * Represents the SemanticUI form values for the EditEmployee form
     * Used to help enforce type safety 
     */
    interface IEmployeeFormValues {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
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
        private _benefitManager: BenefitsManager;
        private _benefitRefreshTimout: number;

        private $form: $;

        public constructor() {
            super("EditEmployee");
        }

        protected initModal(): void {
            // Initialize SemanticUI forms
            this.$form = $('.ui.form', this.$modal).form({
                on: 'change',
                delay: false, // We use our own timeout in onFormChange() for better control
                onSuccess: () => this.saveEmployeeAsync(),

                // Use onValid/onInvalid to refresh benefit summary
                onValid: () => this.onFormChange(),
                onInvalid: () => this.onFormChange(),

                fields: {
                    firstName: { identifier: 'firstName', rules: [{ type: 'empty', prompt: 'Provide a first name' }] },
                    lastName: { identifier: 'lastName', rules: [{ type: 'empty', prompt: 'Provide a last name' }] },
                    email: { identifier: 'email', rules: [{ type: 'email', prompt: 'Provide a valid email address' }] },
                    phoneNumber: { identifier: 'phoneNumber', rules: [{ type: 'phone', prompt: 'Provide a valid phone number' }] },
                    address1: { identifier: 'address1', rules: [{ type: 'empty', prompt: 'Provide an address' }] },
                    address2: { identifier: 'address2', rules: [] },
                    city: { identifier: 'city', rules: [{ type: 'empty', prompt: 'Provide a city' }] },
                    state: { identifier: 'state', rules: [{ type: 'empty', prompt: 'Provide an state' }] },
                    postalCode: { identifier: 'postalCode', rules: [{ type: 'empty', prompt: 'Provide a postal code' }] },
                    country: { identifier: 'country', rules: [{ type: 'empty', prompt: 'Provide a country' }] },
                }
            });

            // Load states/countries into address dropdowns
            Scripts.Helpers.Form.setDropdownStates($(this.$form.form('get field', 'state')).parent());
            Scripts.Helpers.Form.setDropdownCountries($(this.$form.form('get field', 'country')).parent());
            $('.ui.dropdown', this.$modal).dropdown();

            // Prevent modal closing before data is validated/saved
            this.$modal.modal({
                closable: false,
                allowMultiple: true,
                onApprove: () => {
                    // Run form validation to run 'onSuccess'
                    this.$form.form('validate form');
                    return false;
                }
            });

            this._benefitManager = new BenefitsManager(this.$modal);

            this._dependentManager = new DependentManager(this.$modal);
            this._dependentManager.onDependentsChanged(() => {
                const employee = this.getEmployee();
                return this._benefitManager.reload(employee);
            });
        }

        /**
         * Loads and shows the modal.
         * Also loads existing employee data into the form if editing an existing employee.
         * @param pEmployeeGuid     The GUID of the employee to edit. Use NULL for employee creation.
         * @param pOnSaveCallback   The callback function when the employee is saved/updated.
         */
        public show(pEmployeeGuid: string, pOnSaveCallback?: () => void): JQueryPromise<void> {
            this.reset();
            this._employeeGuid = pEmployeeGuid || Scripts.Helpers.Utility.getEmptyGuid();
            this._onSaveCallback = pOnSaveCallback;

            return this.loadModalAsync()
                .then(() => {
                    // Load employee data if editing an existing user
                    if (this._employeeGuid && this._employeeGuid !== Scripts.Helpers.Utility.getEmptyGuid()) {
                        return this.loadExistingEmployeeAsync();
                    } else {
                        // Reload the Benefit Summary to display the default data
                        return this._benefitManager.reload(this.getEmployee());
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

            if (this._dependentManager) {
                this._dependentManager.reset();
            }
        }

        /**
         * Returns the current form values for the employee values
         */
        private getFormValues(): IEmployeeFormValues {
            return this.$form.form('get values');
        }

        /**
         * Loads the details for an existing employee into the form
         */
        private loadExistingEmployeeAsync(): JQueryPromise<void> {
            return Webservice.Employee.getEmployeeAsync(this._employeeGuid).then(employee => {
                const formValues: IEmployeeFormValues = {
                    firstName: employee.FirstName,
                    lastName: employee.LastName,
                    email: employee.Email,
                    phoneNumber: employee.PhoneNumber,

                    // Address can be null if nothing was entered
                    address1: employee.Address?.AddressLine1 || '',
                    address2: employee.Address?.AddressLine2 || '',
                    city: employee.Address?.City || '',
                    state: employee.Address?.State || '',
                    postalCode: employee.Address?.PostalCode || '',
                    country: employee.Address?.CountryCode || '',
                };

                // Load form, dependents, and benefits summary
                this.$form.form('set values', formValues);
                this._dependentManager.setDependents(employee.Dependents);
                return this._benefitManager.reload(employee);
            });
        }

        /**
         * Gets an Employee object with the properties set to the current form values
         */
        private getEmployee(): Interfaces.Core.IEmployee {
            const dependents = this._dependentManager.getDependents();
            const employeeForm = this.getFormValues();

            const address: Interfaces.Core.IAddress = {
                Guid: this._employeeGuid,
                AddressLine1: employeeForm.address1,
                AddressLine2: employeeForm.address2,
                City: employeeForm.city,
                State: employeeForm.state,
                PostalCode: employeeForm.postalCode,
                CountryCode: employeeForm.country
            };

            const ret: Interfaces.Core.IEmployee = {
                Guid: this._employeeGuid,
                FirstName: employeeForm.firstName,
                LastName: employeeForm.lastName,
                Email: employeeForm.email,
                PhoneNumber: employeeForm.phoneNumber,
                Address: address,
                Dependents: dependents
            };

            return ret;
        }

        /**
         * Saves or updates the employee based if the form is valid
         */
        private saveEmployeeAsync(): JQueryPromise<void> {
            // Verify the form is valid
            if (!this.$form.form('is valid')) {
                return $.Deferred<void>().rejectWith("Invalid form input");
            }

            const employee = this.getEmployee();

            // Update or save the employee in the DB
            let savePromise: JQueryPromise<any> = null;
            if (this._employeeGuid && this._employeeGuid !== Scripts.Helpers.Utility.getEmptyGuid()) {
                // Editing an existing employee -- Update them
                savePromise = Webservice.Employee.updateEmployeeAsync(employee);
            } else {
                // Creating a new employee -- Create them
                savePromise = Webservice.Employee.createEmployeeAsync(employee);
            }

            return savePromise.then(() => {
                this.hideModal();

                // Run save callback
                if (this._onSaveCallback) {
                    this._onSaveCallback();
                }
            });
        }

        /**
         * Called when the form is changed
         * Used to refresh the Benefits Summary section
         */
        private onFormChange(): void {

            // Use a timeout to prevent pinging the server on every change
            if (this._benefitRefreshTimout) {
                clearTimeout(this._benefitRefreshTimout);
                this._benefitRefreshTimout = null;
            }

            // Refresh Benefits Summary section
            this._benefitRefreshTimout = setTimeout(() => {
                const employee = this.getEmployee();
                this._benefitManager.reload(employee);
            }, 750);
        }
    }

    /**
     * Manges the Dependent section of the Manage Employee modal
     */
    class DependentManager {
        private _dependents: Interfaces.Core.IDependent[];
        private readonly $uiDependentList: $;

        private readonly _onDependentsChangedCallbacks: (() => void)[];

        public constructor($pModal: $) {
            this._dependents = [];
            this._onDependentsChangedCallbacks = [];

            // Initialize the dependent list
            this.$uiDependentList = $("#uiDepdendentsList", $pModal).DataTable({
                columns: [
                    {
                        title: "First Name",
                        data: "FirstName"
                    },
                    {
                        title: "Last Name",
                        data: "LastName"
                    },
                    {
                        title: '',
                        data: 'Guid',
                        width: '15px',
                        createdCell: (td, _, rowData: Interfaces.Core.IDependent) => {
                            const $icon = $('<i class="link red remove icon"></i>');
                            $icon.click(() => this.removeDependent(rowData.Guid));
                            $(td).html('').append($icon);
                        }
                    }
                ],

                language: {
                    zeroRecords: "No Dependents Claimed",
                    processing: "Processing"
                }
            });

            $("#uiAddDependent", $pModal).click(() => Modals.AddDependent.show(dependent => this.addDependent(dependent.firstName, dependent.lastName)));
        }

        /**
         * Resets the Dependents section
         */
        public reset(): void {
            this._dependents = [];
            this.$uiDependentList.clear().draw();
        }

        /**
         * Subscribes to when the dependents are changed (added or removed)
         * @param pOnDependentAddedCallback
         */
        public onDependentsChanged(pOnDependentAddedCallback: () => void): void {
            this._onDependentsChangedCallbacks.push(pOnDependentAddedCallback);
        }

        /**
         * Returns all the employee's dependents (existing and new)
         * Used for when the form is saving
         */
        public getDependents(): Interfaces.Core.IDependent[] {
            return this._dependents;
        }

        /**
         * Sets the current employee dependents
         * Used for when the form is loading
         * @param pDependents
         */
        public setDependents(pDependents: Interfaces.Core.IDependent[]): void {
            this._dependents = pDependents;
            this.$uiDependentList.clear().rows.add(this._dependents).draw();
        }

        /**
         * Adds a new dependent to the UI
         * @param pFirstName
         * @param pLastName
         */
        private addDependent(pFirstName: string, pLastName: string): void {
            const dependent: Interfaces.Core.IDependent = {
                Guid: Scripts.Helpers.Utility.newGuid(),
                FirstName: pFirstName,
                LastName: pLastName,
            };

            this._dependents.push(dependent);
            this.$uiDependentList.clear().rows.add(this._dependents).draw();
            this.triggerDependentsChanged();
        }

        /**
         * Removes a dependent from the list
         * @param pDependentGuid
         */
        private removeDependent(pDependentGuid: string): void {
            this._dependents = $.grep(this._dependents, item => item.Guid !== pDependentGuid);
            this.$uiDependentList.clear().rows.add(this._dependents).draw();
            this.triggerDependentsChanged();
        }

        /**
         * Triggers all the dependent changed callbacks
         */
        private triggerDependentsChanged(): void {
            for (const index in this._onDependentsChangedCallbacks) {
                try {
                    this._onDependentsChangedCallbacks[index]();
                } catch (ex) {
                    console.error("Callback failed", ex);
                }
            }
        }
    }

    /**
     * Responsible for managing the Benefits Summary section of the modal
     */
    class BenefitsManager {
        private $uiBenefitsWrapper: $;

        public constructor($pModal: $) {
            this.$uiBenefitsWrapper = $("#uiBenefitsWrapper", $pModal);
        }

        /**
         * Reloads the Benefits Summary based on current form values
         * @param pEmployee
         */
        public reload(pEmployee: Interfaces.Core.IEmployee): JQueryPromise<void> {
            return Paylocity.Interview.Web.Controllers.Home.benefitSummaryAsync(pEmployee).then(html => {
                this.$uiBenefitsWrapper.html(html);
            });
        }
    }

    export const EditEmployee = new EditEmploiyeeModal();
}
