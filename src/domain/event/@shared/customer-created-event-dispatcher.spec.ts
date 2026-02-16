import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../customer/handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../customer/handler/send-console-log2-when-customer-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain Customer events tests", () => {

    it("should register two event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const handlers = eventDispatcher.getEventHandlers["CustomerCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(2);
        expect(handlers[0]).toMatchObject(eventHandler1);
        expect(handlers[1]).toMatchObject(eventHandler2);
    });

    it("should unregister only one handler when two are registered", () => {
        const eventDispatcher = new EventDispatcher();

        const handler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const handler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
        ).toBe(2);

        eventDispatcher.unregister("CustomerCreatedEvent", handler1);

        const handlers = eventDispatcher.getEventHandlers["CustomerCreatedEvent"];

        expect(handlers.length).toBe(1);
        expect(handlers).toContain(handler2);
        expect(handlers).not.toContain(handler1);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const handler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const handler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
        ).toBe(2);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers (2 handlers)", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer 1",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

});