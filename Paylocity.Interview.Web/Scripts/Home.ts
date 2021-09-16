namespace Paylocity.Interview.Web.Scripts.Pages {
    /**
     * Manager for the Home screen
     */
    class Home {
        private $uiEmployeeList: JQuery;
        private $uiToggleInactiveEmployeesChk: $;

        public constructor() {
            // Inactive Employees Checkbox
            this.$uiToggleInactiveEmployeesChk = $("#uiToggleInactiveEmployeesCheckbox").checkbox({
                onChange: () => this.onShowInactiveChanged()
            });

            // Initialize the Employee List
            this.$uiEmployeeList = $("#uiEmployeeList").DataTable({
                searching: true,

                columns: [
                    {
                        // View Button
                        title: "",
                        data: "Guid",
                        createdCell: (td, _, rowData) => this.formatViewColumn(td, rowData),
                        width: '15px',
                        searchable: false,
                        orderable: false,
                    },
                    {
                        title: "First Name",
                        data: "FirstName",
                        render: (data: string) => Helpers.Utility.escapeHtml(data)
                    },
                    {
                        title: "Last Name",
                        data: "LastName",
                        render: (data: string) => Helpers.Utility.escapeHtml(data)
                    },
                    {
                        title: "Email",
                        data: "Email",
                        render: (data: string) => Helpers.Utility.escapeHtml(data)
                    },
                    {
                        title: "",
                        data: "IsActive",
                        width: "30px",
                        visible: false,
                        searchable: false,
                        orderable: false,
                        render: (isActive: boolean) => {
                            // Add Inactivate label for inactive employees
                            if (!isActive) {
                                return '<span class="ui right floated red small label">Inactive</span>';
                            }

                            return "";
                        }
                    }
                ],

                language: {
                    zeroRecords: "No Employees Found",
                    processing: "Processing"
                },

                initComplete: () => {
                    $('.row .eight.wide.column', this.$uiEmployeeList).first().html('').append(this.$uiToggleInactiveEmployeesChk);
                },

                order: [[1, 'asc'], [2, 'asc'], [3, 'asc']]
            });

            // Wire Add Employee button
            $("#uiAddEmployeeBtn").click(() => Modals.EditEmployee.show(null, () => this.reloadEmployeesAsync()));

            // Initial load of employees list
            this.reloadEmployeesAsync();
        }

        /**
         * Reloads the employees in the employee list from the API
         */
        private reloadEmployeesAsync(): JQueryPromise<void> {
            const isIncludeInactive = this.isShowingInactive();
            return Webservice.Employee.getEmployeeListAsync(isIncludeInactive).then(employees => this.$uiEmployeeList.clear().rows.add(employees).draw());
        }

        /**
         * Called when the 'Show Inactive Employees' checkbox changes
         * Updates column visibility and reloads the employee list
         */
        private onShowInactiveChanged(): void {
            const isIncludeInactive = this.isShowingInactive();

            // Update IsActive column visibility
            const column = this.$uiEmployeeList.column(4);
            column.visible(isIncludeInactive);

            // Reload employee list
            this.reloadEmployeesAsync();
        }

        /**
         * Checks whether or not inactive employees are being shown
         * Returns TRUE when inactive employees are visible
         * Returns FALSE when inactive employees are not visible
         */
        private isShowingInactive(): boolean {
            const isIncludeInactive: boolean = this.$uiToggleInactiveEmployeesChk.checkbox('is checked');
            return isIncludeInactive;
        }

        /**
         * Formats the datatable View Employee column
         * @param td            HTML table cell element
         * @param rowData       Data of the row
         */
        private formatViewColumn(td: HTMLTableCellElement, rowData: Interfaces.Core.IEmployeeListItem): void {
            // Add View Employee button and write to EditEmployee modal
            const $viewBtn = $("<div class='ui small compact icon button'><i class='link search plus icon'></i></div>")
                .click(() => Paylocity.Interview.Web.Modals.EditEmployee.show(rowData.Guid, () => this.reloadEmployeesAsync()));

            $(td).html('').append($viewBtn);
        }
    }

    // Init the Home screen
    $(document).ready(() => new Home());
}
