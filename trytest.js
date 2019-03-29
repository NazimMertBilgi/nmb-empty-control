"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype._getName = function () {
        return "Hello, " + this.name;
    };
    return Customer;
}());
exports.Customer = Customer;
var user = new Customer();
user.name = "NMB";
alert(user._getName());
//# sourceMappingURL=trytest.js.map