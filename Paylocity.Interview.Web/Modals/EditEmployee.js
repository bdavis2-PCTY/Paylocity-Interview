var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Paylocity;
(function (Paylocity) {
    var Interview;
    (function (Interview) {
        var Web;
        (function (Web) {
            var Modals;
            (function (Modals) {
                /**
                 * modal for editing an employee
                 */
                var EditEmploiyeeModal = /** @class */ (function (_super) {
                    __extends(EditEmploiyeeModal, _super);
                    function EditEmploiyeeModal() {
                        return _super.call(this, "EditEmployee") || this;
                    }
                    EditEmploiyeeModal.prototype.initModal = function () {
                        this.$form = $('.ui.form', this.$modal).form({
                            fields: {
                                firstName: { identifier: 'firstName', rules: [{ type: 'empty', prompt: 'Provide a first name' }] },
                                lastName: { identifier: 'lastName', rules: [{ type: 'empty', prompt: 'Provide a last name' }] },
                                email: { identifier: 'email', rules: [{ type: 'email', prompt: 'Provide a valid email address' }] },
                                state: { identifier: 'state', rules: [{ type: 'empty', prompt: 'Select a state' }] },
                                country: { identifier: 'country', rules: [{ type: 'empty', prompt: 'Select a country' }] },
                            }
                        });
                        Web.Scripts.Helpers.Form.setDropdownStates($(this.$form.form('get field', 'state')).parent());
                        Web.Scripts.Helpers.Form.setDropdownCountries($(this.$form.form('get field', 'country')).parent());
                        $('.ui.dropdown', this.$modal).dropdown();
                    };
                    EditEmploiyeeModal.prototype.show = function (pEmployeeGuid) {
                        var _this = this;
                        this._employeeGuid = pEmployeeGuid;
                        return this.loadModalAsync()
                            .then(function () { return _this.showModal(); });
                    };
                    return EditEmploiyeeModal;
                }(Modals.BaseModal));
                Modals.EditEmployee = new EditEmploiyeeModal();
            })(Modals = Web.Modals || (Web.Modals = {}));
        })(Web = Interview.Web || (Interview.Web = {}));
    })(Interview = Paylocity.Interview || (Paylocity.Interview = {}));
})(Paylocity || (Paylocity = {}));
//# sourceMappingURL=EditEmployee.js.map