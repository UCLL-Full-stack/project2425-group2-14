import shoppingcartDb from '../repository/shoppingcart.db';
import { Shoppingcart } from '../model/shoppingcart';
import itemDb from '../repository/item.db';
import { ShoppingcartInput } from '../types';

const getAllShoppingcarts = async (): Promise<Shoppingcart[]> => {
    const shoppingcarts = shoppingcartDb.getAll();
    if (!shoppingcarts) {
        throw new Error('No shoppingcarts found');
    }

    return shoppingcarts;
};

const addItemToShoppingcart = async ({
    itemId,
    shoppingcartId,
}: {
    itemId: number;
    shoppingcartId: number;
}): Promise<Shoppingcart> => {
    const item = await itemDb.getById(itemId);
    const shoppingcart = await shoppingcartDb.getById(shoppingcartId);

    if (!item || !shoppingcart) {
        throw new Error('Item or shoppingcart not found');
    }

    await shoppingcartDb.addItemToShoppingcart({ item, shoppingcart });

    const updatedShoppingcart = await shoppingcartDb.getById(shoppingcartId);
    if (!updatedShoppingcart) {
        throw new Error('Failed to retrieve updated shoppingcart');
    }

    return updatedShoppingcart;
};

const createShoppingcart = async (shoppingcart: ShoppingcartInput): Promise<Shoppingcart> => {
    const newShoppingcart = new Shoppingcart(shoppingcart);

    const createdShoppingcart = shoppingcartDb.create(newShoppingcart);

    if (!createdShoppingcart) {
        throw new Error('Could not create shoppingcart');
    }

    return createdShoppingcart;
};

export default { getAllShoppingcarts, addItemToShoppingcart, createShoppingcart };
