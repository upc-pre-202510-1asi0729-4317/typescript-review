import {Currency} from "./currency";

export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency;

    constructor(amount : number, currency: Currency) {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        this._amount = amount;
        this._currency = currency;
    }

    /** @public */
    public get amount(): number { return this._amount; }

    /** @public */
    public get currency(): Currency { return this._currency; }

    public add = (other: Money) => {
        if (this._currency.code !== other.currency.code) {
            throw new Error("Cannot add Money with different currency code");
        }
        return new Money(this._amount + other.amount, this._currency);
    }

    public multiply = (factor: number): Money => {
        if (factor <= 0) {
            throw new Error("Cannot multiply Money by a negative or zero factor");
        }
        return new Money(this._amount * factor, this._currency);
    }

    public toString = (): string => `${this._currency.code}-${this._amount.toFixed(2)}`;

}