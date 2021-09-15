namespace Paylocity.Interview.Web.Scripts {

    /**
     * Manager for the Home screen
     */
    class Home {
        private $uiEmployeeList: JQuery;

        public constructor() {
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
                        data: "FirstName"
                    },
                    {
                        title: "Last Name",
                        data: "LastName"
                    },
                    {
                        title: "Email",
                        data: "Email"
                    }
                ],

                language: {
                    zeroRecords: "No Employees Found",
                    processing: "Processing"
                }
            });

            // Wire Add Employee button
            $("#uiAddEmployeeBtn").click(() => Modals.EditEmployee.show(null, () => this.reloadEmployees()));

            // Initial load of employees list
            this.reloadEmployees();
        }

        /**
         * Reloads the employees in the employee list from the API
         */
        private reloadEmployees(): JQueryPromise<void> {
            return Webservice.Employee.getEmployeeListAsync().then(employees => this.$uiEmployeeList.clear().rows.add(employees).draw());
        }

        /**
         * Formats the datatable View Employee column
         * @param td            HTML table cell element
         * @param rowData       Data of the row
         */
        private formatViewColumn(td: HTMLTableCellElement, rowData: Interfaces.Core.IEmployeeListItem) {
            // Add View Employee button and write to EditEmployee modal
            const $viewBtn = $("<div class='ui small compact icon button'><i class='link search plus icon'></i></div>")
                .click(() => Paylocity.Interview.Web.Modals.EditEmployee.show(rowData.Guid, () => this.reloadEmployees()));

            $(td).html('').append($viewBtn);
        }
    }

    // Init the Home screen
    $(document).ready(() => new Home());
}
