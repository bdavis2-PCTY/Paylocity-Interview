namespace Paylocity.Interview.Web.Webservice {
    /**
     * Employee webservice references
     * [URL]/Webservices/Employee.asmx
     */
    class EmployeeWebservice extends WebserviceBase {
        public constructor() {
            super('Employee.asmx');
        }

        public getEmployeeListAsync(pIncludeInactive: boolean): JQueryPromise<Interfaces.Core.IEmployeeListItem[]> {
            const params = {
                pIncludeInactive: pIncludeInactive
            };

            return super.postAsync('GetEmployeeList', params);
        }

        public getEmployeeAsync(pEmployeeGuid: string): JQueryPromise<Interfaces.Core.IEmployee> {
            const params = {
                pEmployeeGuid: pEmployeeGuid
            };

            return super.postAsync('GetEmployee', params);
        }

        public getEmployeeBenefitsAsync(pEmployeeGuid: string): JQueryPromise<void> {
            const params = {
                pEmployeeGuid: pEmployeeGuid
            };

            return super.postAsync('GetEmployeeBenefits', params);
        }

        public updateEmployeeAsync(pEmployee: Interfaces.Core.IEmployee): JQueryPromise<void> {
            const params = {
                pEmployee: pEmployee
            };

            return this.postAsync('UpdateEmployee', params);
        }

        public createEmployeeAsync(pEmployee: Interfaces.Core.IEmployee): JQueryPromise<string> {
            const params = {
                pEmployee: pEmployee
            };

            return this.postAsync('CreateEmployee', params);
        }

        public deleteEmployeeAsync(pEmployeeGuid: string): JQueryPromise<string> {
            const params = {
                pEmployeeGuid: pEmployeeGuid
            };

            return this.postAsync('DeleteEmployee', params);
        }
    }

    export const Employee = new EmployeeWebservice();
}
