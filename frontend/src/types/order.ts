import {Product} from "../store/slices/productTypes.ts";

export interface Order {
    _id: string;
    customerId: Customer;
    items: OrderProduct[];
}

export interface Customer {
    firstname: string;
    lastname: string;
    email: string
    id: string;
}

export interface OrderProduct {
    id: string;
    product: Product
    quantity: number;
    subtotal: number;
    unitPriceAtOrder: number

}
