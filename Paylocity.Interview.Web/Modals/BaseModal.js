var Paylocity;
(function (Paylocity) {
    var Interview;
    (function (Interview) {
        var Web;
        (function (Web) {
            var Modals;
            (function (Modals) {
                /**
                 * Base implementation for lazy loading modal windows
                 */
                var BaseModal = /** @class */ (function () {
                    function BaseModal(pModalname) {
                        // Builds the URL of where to load the modal
                        // EX. http://localhost/PaylocityInterview/Modal/EditEmployee
                        this._modalUrl = Web.Scripts.Helpers.Utility.getSiteUrl() + "/Modal/" + pModalname;
                    }
                    Object.defineProperty(BaseModal.prototype, "$modal", {
                        /**
                         * Getter for the jQuery modal object
                         * Allows derived classes to access the modal without setting it
                         */
                        get: function () {
                            return this._$modal;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    BaseModal.prototype.loadModalAsync = function () {
                        var _this = this;
                        // Check if the modal's HTML has already been loaded
                        // If so, just continue execution
                        if (this._$modal) {
                            var promise = $.Deferred().resolve();
                            return promise.promise();
                        }
                        var ajaxSettings = {
                            url: this._modalUrl,
                            type: 'GET',
                            dataType: 'html'
                        };
                        return $.ajax(ajaxSettings).then(function (modalHtml) {
                            _this._$modal = $(modalHtml).modal({
                                closable: false
                            });
                            $('.ui.modals.dimmer').append(_this._$modal);
                            _this._$modal.modal('refresh');
                        })
                            .then(function () { return _this.initModal(); })
                            .fail(function (error) { return console.error("Failed to load from " + _this._modalUrl, error); });
                    };
                    BaseModal.prototype.showModal = function () {
                        // Ensure the modal's HTML has been loaded
                        if (!this.$modal) {
                            throw "The modal needs to be loaded before showing it";
                        }
                        this.$modal.modal('show');
                    };
                    return BaseModal;
                }());
                Modals.BaseModal = BaseModal;
            })(Modals = Web.Modals || (Web.Modals = {}));
        })(Web = Interview.Web || (Interview.Web = {}));
    })(Interview = Paylocity.Interview || (Paylocity.Interview = {}));
})(Paylocity || (Paylocity = {}));
//# sourceMappingURL=BaseModal.js.map