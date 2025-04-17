import {Customer} from "./crm/domain/model/customer";
import {Currency} from "./shared/domain/model/currency";
import {SalesOrder} from "./sales/domain/model/sales-order";

console.log('Happy developing ✨')

try {
    const customer = new Customer("John Doe");

    const usdCurrencyCode = "USD" as const;
    const usdCurrency = new Currency(usdCurrencyCode);
    const realTimeSalesOrder = new SalesOrder(customer.id, usdCurrency);

    realTimeSalesOrder.addItem("P001", 2, 100);
    realTimeSalesOrder.addItem("P002", 1, 500);
    realTimeSalesOrder.addItem("P003", 5, 230);

    customer.lastOrderPrice = realTimeSalesOrder.calculateTotalPrice();

    console.log(`Real-time Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${realTimeSalesOrder.getFormattedOrderedAt()}, State: ${realTimeSalesOrder.state}, Total: ${customer.lastOrderPrice?.format()}`);

} catch (error) {
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    } else {
        console.error("An error ocurred:", error);
    }
}