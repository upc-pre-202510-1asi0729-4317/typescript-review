"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrder = void 0;
const uuid_1 = require("uuid");
const sales_order_item_1 = require("./sales-order-item");
const date_time_1 = require("../../../shared/domain/model/date-time");
const money_1 = require("../../../shared/domain/model/money");
/**
 * Represents a sales order aggregate root in the Sales bounded context, managing its own state transitions.
 */
class SalesOrder {
    constructor(customerId, currency, orderedAt) {
        if (!customerId || customerId.trim() === "") {
            throw new Error("Customer ID cannot be empty");
        }
        this._id = (0, uuid_1.v4)();
        this._customerId = customerId;
        this._currency = currency;
        this._items = [];
        this._orderedAt = new date_time_1.DateTime(orderedAt);
        this._state = "PENDING";
    }
    get id() { return this._id; }
    get customerId() { return this._customerId; }
    get orderedAt() { return this._orderedAt; }
    get currency() { return this._currency; }
    get state() { return this._state; }
    /**
     * Adds an item to the sales order if the current state allows it.
     * @public
     * @param productId - The ID of the product being ordered.
     * @param quantity - The number of units ordered.
     * @param unitPriceAmount - The price per unit.
     * @throws {Error} If productId is empty, quantity is non-positive, or state disallows adding items.
     */
    addItem(productId, quantity, unitPriceAmount) {
        if (!productId || productId.trim() === "") {
            throw new Error("Product ID cannot be empty");
        }
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        if (!this.canAddItems()) {
            throw new Error(`Cannot add items to a ${this._state} order`);
        }
        const unitPrice = new money_1.Money(unitPriceAmount, this._currency);
        const item = new sales_order_item_1.SalesOrderItem(this._id, productId.trim(), quantity, unitPrice);
        this._items.push(item);
    }
    /**
     * Calculates the total price of all items in the order.
     * @public
     * @returns The total price in the order's currency.
     */
    calculateTotalPrice() {
        return this._items.reduce((total, item) => total.add(item.calculateItemPrice()), new money_1.Money(0, this._currency));
    }
    /**
     * Formats the order date as a human-readable string.
     * @public
     * @returns The formatted date (e.g., "April 9, 2025, 10:30 AM PDT").
     */
    getFormattedOrderedAt() {
        return this._orderedAt.format();
    }
    /**
     * Confirms the sales order, transitioning it to CONFIRMED if allowed.
     * @public
     * @throws {Error} If the current state does not allow confirmation.
     */
    confirm() {
        if (this._state === "PENDING") {
            this._state = "CONFIRMED";
        }
        else {
            throw new Error(`Cannot confirm an order that is ${this._state}`);
        }
    }
    /**
     * Ships the sales order, transitioning it to SHIPPED if allowed.
     * @public
     * @throws {Error} If the current state does not allow shipping.
     */
    ship() {
        if (this._state === "CONFIRMED") {
            this._state = "SHIPPED";
        }
        else {
            throw new Error(`Cannot ship an order that is ${this._state}`);
        }
    }
    /**
     * Cancels the sales order, transitioning it to CANCELLED if allowed.
     * @public
     * @throws {Error} If the current state does not allow cancellation.
     */
    cancel() {
        if (this._state === "SHIPPED" || this._state === "CANCELLED") {
            throw new Error(`Cannot cancel an order that is ${this._state}`);
        }
        this._state = "CANCELLED";
    }
    /**
     * Checks if items can be added based on the current state.
     * @private
     * @returns True if items can be added, false otherwise.
     */
    canAddItems() {
        return this._state !== "CANCELLED" && this._state !== "SHIPPED";
    }
}
exports.SalesOrder = SalesOrder;
