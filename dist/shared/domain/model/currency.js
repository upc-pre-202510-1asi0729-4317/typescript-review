"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
/**
 * Represents a currency in the Shared bounded context.
 */
class Currency {
    /**
     * Creates a new Currency instance.
     * @param code - The 3-letter ISO 4217 currency code.
     */
    constructor(code) {
        /**
         * Formats an amount in this currency for a given locale.
         * @public
         * @param amount - The amount to format.
         * @param locale - The locale for formatting (defaults to "en-US").
         * @returns The formatted amount (e.g., "$1,234.56" or "S/1,234.56").
         */
        this.formatAmount = (amount, locale = "en-US") => {
            return amount.toLocaleString(locale, {
                style: "currency",
                currency: this._code,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };
        /**
         * Converts the currency to a string representation.
         * @public
         * @returns The currency code.
         */
        this.toString = () => this._code;
        this._code = code;
    }
    /** @public */
    get code() { return this._code; }
}
exports.Currency = Currency;
