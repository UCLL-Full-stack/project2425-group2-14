import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';
import db from './db';

const addItemToShoppingcart = async ({
    item,
    shoppingcart,
}: {
    item: Item;
    shoppingcart: Shoppingcart;
}) => {
    try {
        // Add the item to the shopping cart in the database
        const updatedShoppingcart = await db.shoppingcart.update({
            where: { id: shoppingcart.getId() },
            data: {
                items: {
                    connect: [{ id: item.getId() }], // Associate the item with the cart
                },
            },
            include: { items: true }, // Fetch the updated list of items in the shopping cart
        });

        if (!updatedShoppingcart) {
            throw new Error('Could not update the shoppingcart');
        }

        // Update the in-memory shoppingcart representation
        shoppingcart = await Shoppingcart.from(updatedShoppingcart, updatedShoppingcart.items);
    } catch (error) {
        console.error('Error adding item to shoppingcart:', error);
        throw new Error('Could not add item to shoppingcart');
    }
};

const getAll = async (): Promise<Shoppingcart[]> => {
    try {
        const shoppingcarts = await db.shoppingcart.findMany({
            orderBy: { id: 'asc' },
            include: { items: true },
        });
        const shoppingcartPromises = shoppingcarts.map((shoppingcart) =>
            Shoppingcart.from(shoppingcart, shoppingcart.items)
        );
        return await Promise.all(shoppingcartPromises);
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const getById = async (id: number): Promise<Shoppingcart | undefined> => {
    try {
        const shoppingcart = await db.shoppingcart.findUnique({
            where: { id },
            include: { items: true },
        });
        return shoppingcart ? Shoppingcart.from(shoppingcart, shoppingcart.items) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

const create = async (shoppingcart: Shoppingcart): Promise<Shoppingcart> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.create({
            data: {
                name: shoppingcart.getName(),
                deliveryDate: shoppingcart.getDeliveryDate(),
                userId: shoppingcart.getUser().getId()!,
                items: {
                    connect: shoppingcart.getItems().map((item) => ({ id: item.getId() })),
                },
            },
            include: { items: true },
        });
        return Shoppingcart.from(shoppingcartPrisma, shoppingcartPrisma.items);
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

export default {
    getAll,
    getById,
    addItemToShoppingcart,
    create,
};
