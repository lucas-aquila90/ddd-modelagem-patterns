import CustomerChangedAddressEvent from "../customer/customer-change-address.event";
import SendConsoleLogWhenAddressChangedHandler from "../customer/handler/send-console-log-when-address-changed.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);
    });

    it ("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(0);
    });

    it ("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();

        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeUndefined();

    });

    it ("should notify all event handlers", () => {
        // Cria o EventDispatcher
        const eventDispatcher = new EventDispatcher();
        // Cria o event handler e espiona o método handl
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();
        // Cria um spy para o método handle do event handler
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        // Registra o event handler no EventDispatcher
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler);

        const customerChangeAddressEvent = new CustomerChangedAddressEvent({
            id: "123",
            name: "Customer 1",
            address: "Customer 1 address",
        });

        // Quando o notify for chamado, o método handle do event handler deve ser chamado
        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

});