"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("./crm/domain/model/customer");
const currency_1 = require("./shared/domain/model/currency");
const sales_order_1 = require("./sales/domain/model/sales-order");
console.log('Happy developing ✨');
try {
    const customer = new customer_1.Customer("John Doe");
    const usdCurrencyCode = "USD";
    const usdCurrency = new currency_1.Currency(usdCurrencyCode);
    const realTimeSalesOrder = new sales_order_1.SalesOrder(customer.id, usdCurrency);
    realTimeSalesOrder.addItem("P001", 2, 100);
    realTimeSalesOrder.addItem("P002", 1, 500);
    realTimeSalesOrder.addItem("P003", 5, 230);
    customer.lastOrderPrice = realTimeSalesOrder.calculateTotalPrice();
    console.log(`Real-time Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${realTimeSalesOrder.getFormattedOrderedAt()}, State: ${realTimeSalesOrder.state}, Total: ${(_a = customer.lastOrderPrice) === null || _a === void 0 ? void 0 : _a.format()}`);
}
catch (error) {
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    }
    else {
        console.error("An error ocurred:", error);
    }
}
