namespace Paylocity.Interview.Web.Webservice {
    /**
     * Employee webservice references
     * [URL]/Webservices/Employee.asmx
     */
    class EmployeeWebservice extends WebserviceBase {
        public constructor() {
            super('Employee.asmx');
        }

        public getEmployeeListAsync(): JQueryPromise<Interfaces.Core.IEmployeeListItem[]> {
            return super.postAsync('GetEmployeeList');
        }
    }

    export const Employee = new EmployeeWebservice();
}
