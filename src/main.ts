import Address from "./domain/entity/address.js";
import Customer from "./domain/entity/customer.js";
import Order from "./domain/entity/order.js";
import OrderItem from "./domain/entity/order_item.js";

let customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 2, "p1");
const item2 = new OrderItem("2", "Item 2", 20, 2, "p2");

const order = new Order("1", "123", [item1, item2]);