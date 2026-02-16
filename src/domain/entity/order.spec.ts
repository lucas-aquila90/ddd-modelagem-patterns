import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrow("Id is required");
  });

    it("should throw error when cutomerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should throw error when cutomerId is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrow("Items are required" );
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 100, 2, "p1");
    const item2 = new OrderItem("2", "Item 2", 200, 2, "p2");
    const order = new Order("123", "123", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("124", "124", [item, item2]);

    total = order2.total();

    expect(total).toBe(600);

  });

    it("should throw error if the item qtd is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, 0, "p1");
      const order = new Order("123", "123", [item]);
    }).toThrow("Quantity must be greater than 0");

  });



});