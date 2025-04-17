/**
 * Represents a point in time with validation and formatting capabilities in the Shared bounded context
 */
export class DateTime {
    private readonly _date: Date;

    /**
     * Creates a new DateTime instance, defaulting to the current time if no value is provided.
     * @param value - The date value (optional, default to now)
     * @throws {Error} If the provided value is invalid or in the future relative to now.
     */
    constructor(value?: Date | string) {
        const now = new Date();
        if(!value) {
            this._date = now;
        } else {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Invalid date');
            }
            this._date = parsedDate;
        }
        if (this._date > now) {
            throw new Error('DateTime cannot be in the future');
        }
    }

    public get value() {
        return this._date;
    }

    public toString(): string {
        return this._date.toString();
    }
}