namespace Paylocity.Interview.Web.Webservice {

    /**
     * Employee webservice references
     * [URL]/Webservices/Employee.asmx
     */
    class EmployeeWebservice extends WebserviceBase {

        public constructor() {
            super('Employee');
        }

        public getEmployeesAsync(): JQueryPromise<object[]> {
            return super.postAsync('GetEmployees');
        }

    }

    export const Employee = new EmployeeWebservice();
}