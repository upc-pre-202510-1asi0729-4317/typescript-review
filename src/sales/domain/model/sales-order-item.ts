import { v4 as uuidv4 } from "uuid";
import {Money} from "../../../shared/domain/model/money";

export class SalesOrderItem {
    private readonly _orderId: string;
    private readonly _itemId: string;
    private readonly _productId: string;
    private readonly _quantity: number;
    private readonly _unitPrice: Money;

    constructor(orderId: string, productId: string, quantity: number, unitPrice: Money) {
        this._itemId = uuidv4();
        this._orderId = orderId;
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    public calculateItemPrice = (): Money => this._unitPrice.multiply(this._quantity);

    public get productId(): string { return this._productId; }
    public get quantity(): number { return this._quantity; }
    public get unitPrice(): Money { return this._unitPrice; }
}