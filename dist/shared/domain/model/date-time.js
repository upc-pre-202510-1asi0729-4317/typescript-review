"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
/**
 * Represents a point in time with validation and formatting capabilities in the Shared bounded context.
 */
class DateTime {
    /**
     * Creates a new DateTime instance, defaulting to the current time if no value is provided.
     * @param value - The date value (optional, defaults to now).
     * @throws {Error} If the provided value is invalid or in the future relative to now.
     */
    constructor(value) {
        const now = new Date();
        if (!value) {
            this._date = now;
        }
        else {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime())) {
                throw new Error("Invalid date value provided");
            }
            this._date = parsedDate;
        }
        if (this._date > now) {
            throw new Error("DateTime cannot be in the future");
        }
    }
    /**
     * Gets the underlying Date object.
     * @public
     * @returns The Date instance.
     */
    get value() {
        return this._date;
    }
    /**
     * Formats the date as a human-readable string.
     * @public
     * @param locale - The locale for formatting (defaults to "en-US").
     * @returns The formatted date (e.g., "April 9, 2025, 10:30 AM PDT").
     */
    format(locale = "en-US") {
        return this._date.toLocaleString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short"
        });
    }
    /**
     * Converts the DateTime to a string representation.
     * @public
     * @returns The ISO string representation of the date.
     */
    toString() {
        return this._date.toISOString();
    }
}
exports.DateTime = DateTime;
