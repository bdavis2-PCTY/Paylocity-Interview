﻿namespace Paylocity.Interview.Web.Scripts.Pages {
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
                        data: "FirstName",
                        render: data => Helpers.Utility.escapeHtml(data)
                    },
                    {
                        title: "Last Name",
                        data: "LastName",
                        render: data => Helpers.Utility.escapeHtml(data)
                    },
                    {
                        title: "Email",
                        data: "Email",
                        render: data => Helpers.Utility.escapeHtml(data)
                    }
                ],

                language: {
                    zeroRecords: "No Employees Found",
                    processing: "Processing"
                }
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
                .click(() => Paylocity.Interview.Web.Modals.EditEmployee.show(rowData.Guid, () => this.reloadEmployeesAsync()));

            $(td).html('').append($viewBtn);
        }
    }

    // Init the Home screen
    $(document).ready(() => new Home());
}
