import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';
import db from './db';

const addItemToShoppingcart = ({
    item,
    shoppingcart,
}: {
    item: Item;
    shoppingcart: Shoppingcart;
}) => {
    try {
        shoppingcart.addItem(item);
    } catch (error) {
        console.log(error);
        throw new Error('Could not add item to shoppingcart');
    }
};

const getAll = async (): Promise<Shoppingcart[]> => {
    try {
        const shoppingcarts = await db.shoppingcart.findMany();
        return shoppingcarts.map((shoppingcart) => Shoppingcart.from(shoppingcart));
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const getById = async (id: number): Promise<Shoppingcart | undefined> => {
    try {
        const shoppingcart = await db.shoppingcart.findUnique({ where: { id } });
        return shoppingcart ? Shoppingcart.from(shoppingcart) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

const create = async (shoppingcart: Shoppingcart): Promise<Shoppingcart> => {
    try {
        const exists = await db.shoppingcart.findUnique({ where: { id: shoppingcart.getId() } });

        if (exists) {
            throw new Error('Shoppingcart already exists');
        }

        const createdShoppingCart = await db.shoppingcart.create({
            data: {
                id: shoppingcart.getId()!,
                name: shoppingcart.getName(),
                deliveryDate: shoppingcart.getDeliveryDate(),
                userId: shoppingcart.getUser().getId()!,
                items: {
                    connect: shoppingcart.getItems().map((item) => ({
                        id: item.getId(),
                    })),
                },
            },
        });
        return Shoppingcart.from(createdShoppingCart);
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
