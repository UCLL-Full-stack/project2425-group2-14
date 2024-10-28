import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';
import shoppingcartDb from '../repository/shoppingcart.db';

const getAllShoppingcarts = (): Shoppingcart[] => {
    const shoppingcarts = shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }
    return shoppingcarts;
};

const createShoppingcart = (shoppingcart: { name: string; deliveryDate: Date }): Shoppingcart => {
    if (!shoppingcart) {
        throw new Error('No shoppingcart provided');
    }
    if (!shoppingcart.name || shoppingcart.name === '') {
        throw new Error('Shoppingcart name is empty');
    }
    if (!shoppingcart.deliveryDate) {
        throw new Error('No delivery date provided');
    }
    if (shoppingcart.deliveryDate < new Date()) {
        throw new Error('Delivery date is in the past');
    }
    const createdShoppingCart = shoppingcartDb.create(new Shoppingcart(shoppingcart));
    if (!createdShoppingCart) {
        throw new Error('Could not create shoppingcart');
    }
    return createdShoppingCart;
};

const addItemToShoppingcart = (item: Item, shoppingcart: Shoppingcart): Item => {
    if (!shoppingcart || !item) {
        throw new Error('No shoppingcart or item provided');
    }

    const updatedShoppingcart = shoppingcartDb.addItem(item, shoppingcart);

    if (!updatedShoppingcart) {
        throw new Error('Could not add item to shoppingcart');
    }

    return item;
};

export default {
    getAllShoppingcarts,
    createShoppingcart,
    addItemToShoppingcart,
};
