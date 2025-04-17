"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
/**
 * Represents a monetary amount with a specific currency in the Shared bounded context.
 */
class Money {
    /**
     * Creates a new Money instance.
     * @param amount - The monetary amount (must be non-negative).
     * @param currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount, currency) {
        /**
         * Converts the money to a string representation.
         * @public
         * @returns The amount and currency code (e.g., "USD 123.45").
         */
        this.toString = () => `${this._currency.code} ${this._amount.toFixed(2)}`;
        /**
         * Formats the money amount for a given locale.
         * @public
         * @param locale - The locale for formatting (defaults to "en-US").
         * @returns The formatted amount (e.g., "$123.45").
         */
        this.format = (locale = "en-US") => this._currency.formatAmount(this._amount, locale);
        /**
         * Adds another Money instance to this one.
         * @public
         * @param other - The Money to add.
         * @returns A new Money instance with the sum.
         * @throws {Error} If currencies do not match.
         */
        this.add = (other) => {
            if (this._currency.code !== other.currency.code) {
                throw new Error("Cannot add Money with different currencies");
            }
            return new Money(this._amount + other.amount, this._currency);
        };
        /**
         * Multiplies the amount by a factor.
         * @public
         * @param factor - The multiplication factor (must be non-negative).
         * @returns A new Money instance with the multiplied amount.
         * @throws {Error} If factor is negative.
         */
        this.multiply = (factor) => {
            if (factor < 0) {
                throw new Error("Cannot multiply Money by a negative factor");
            }
            return new Money(this._amount * factor, this._currency);
        };
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        this._amount = amount;
        this._currency = currency;
    }
    /** @public */
    get amount() { return this._amount; }
    /** @public */
    get currency() { return this._currency; }
}
exports.Money = Money;
