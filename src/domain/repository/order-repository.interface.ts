import { Order } from "sequelize";
import Customer from "../entity/customer";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {

}