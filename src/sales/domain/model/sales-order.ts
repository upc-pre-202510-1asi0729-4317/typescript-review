import { v4 as uuidv4 } from "uuid";
import {SalesOrderItem} from "./sales-order-item";
import {DateTime} from "../../../shared/domain/model/date-time";
import {Currency} from "../../../shared/domain/model/currency";
import {Money} from "../../../shared/domain/model/money";

export class SalesOrder {
    private readonly _customerId: string;
    private readonly _id: string;
    private readonly _items: SalesOrderItem[];
    private readonly _orderedAt: DateTime;
    private readonly _currency: Currency;
    // generar constraint para que _state solo sea assignable los siguientes valores
    // PENDING, CONFIRMED, SHIPPED, CANCELLED
    private _state: string;

    constructor(customerId: string, currency: Currency, orderedAt?: Date | string) {
        if (!customerId || customerId.trim() === "") {
            throw new Error("Customer ID cannot be empty");
        }
        this._id = uuidv4();
        this._customerId = customerId;
        this._currency = currency;
        this._items = [];
        this._orderedAt = new DateTime(orderedAt);
        this._state = "PENDING";
    }

    public get id(): string { return this._id; }
    public get customerId(): string { return this._customerId; }
    public get orderedAt(): DateTime { return this._orderedAt; }
    public get currency(): Currency { return this._currency; }
    public get state(): string { return this._state; }

    public addItem() {
        // usar push y previamente validar productId, quantity > 0
    }

    public calculateTotalPrice() : Money {
        return this._items.reduce(
            (total, item) =>
                total.add(item.calculateItemPrice()),
                new Money(0, this._currency)
        )
    }
}