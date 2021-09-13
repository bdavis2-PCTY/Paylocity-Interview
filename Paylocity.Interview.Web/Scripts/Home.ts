namespace Paylocity.Interview.Web.Scripts {
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
            const $viewBtn = $("<i class='link search plus icon'></i>").click(() => {
                console.log('viewing ' + rowData.Guid);
                Paylocity.Interview.Web.Modals.EditEmployee.show();
            });

            $(td).html('').append($viewBtn);
        }
    }

    $(document).ready(() => new Home());
}
