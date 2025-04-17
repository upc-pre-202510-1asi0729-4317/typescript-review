"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const uuid_1 = require("uuid");
class Customer {
    constructor(name) {
        if (!name || name.trim() === "") {
            throw new Error("Customer name cannot be empty");
        }
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._lastOrderPrice = null;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get lastOrderPrice() { return this._lastOrderPrice; }
    set lastOrderPrice(newLastOrderPrice) {
        this._lastOrderPrice = newLastOrderPrice;
    }
}
exports.Customer = Customer;
