/**
 * Maps C# DTO objects to typescript interfaces from the Core assembly
 */
namespace Paylocity.Interview.Web.Interfaces.Core {
    // Paylocity.Interview.Logic.Core.DTO.Employee
    export interface IEmployee {
        Guid: string;
        FirstName: string;
        LastName: string;
        Email: string;
        PhoneNumber: string;
        Address: IAddress;
        Dependents: IDependent[];
    }

    // Paylocity.Interview.Logic.Core.DTO.EmployeeListItem
    export interface IEmployeeListItem {
        Guid: string;
        FirstName: string;
        LastName: string;
        Email: string;
    }

    // Paylocity.Interview.Logic.Core.DTO.Dependent
    export interface IDependent {
        Guid: string;
        FirstName: string;
        LastName: string;
    }

    // Paylocity.Interview.Logic.Core.DTO.Address
    export interface IAddress {
        Guid: string;
        AddressLine1: string;
        AddressLine2: string;
        City: string;
        State: string;
        PostalCode: string;
        CountryCode: string;
    }
}
