import { Item } from '../model/item';
import { Shoppingcart } from '../model/shoppingcart';
import db from './db';

const getAll = async (): Promise<Shoppingcart[]> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.findMany({
            include: {
                items: true,
                user: true,
            },
        });
        const shoppingcartsWithItems = await Promise.all(
            shoppingcartPrisma.map(async (cart) => {
                const withItems = await db.shoppingcart.findUnique({
                    where: {
                        id: cart.id,
                    },
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                        user: true,
                    },
                });
                return withItems;
            })
        );

        return shoppingcartsWithItems
            .map((cart) => (cart ? Shoppingcart.from(cart) : null))
            .filter((cart): cart is Shoppingcart => cart !== null);
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all shoppingcarts');
    }
};

const getById = async (id: number): Promise<Shoppingcart | undefined> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                items: true,
            },
        });

        const shoppingcartWithItems = await db.shoppingcart.findUnique({
            where: {
                id: shoppingcartPrisma?.id,
            },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                user: true,
            },
        });

        return shoppingcartWithItems ? Shoppingcart.from(shoppingcartWithItems) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get shoppingcart by id');
    }
};

const create = async (shoppingcart: Shoppingcart): Promise<Shoppingcart> => {
    try {
        const shoppingcartPrisma = await db.shoppingcart.create({
            data: {
                name: shoppingcart.getName(),
                deliveryDate: new Date(shoppingcart.getDeliveryDate()),
                user: {
                    connect: {
                        id: shoppingcart.getUser()?.getId(),
                    },
                },
            },

            include: {
                items: true,
                user: true,
            },
        });

        const shoppingcartWithItems = await db.shoppingcart.findUnique({
            where: {
                id: shoppingcartPrisma.id,
            },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                user: true,
            },
        });

        if (!shoppingcartWithItems) {
            throw new Error('Could not fetch created shopping cart');
        }

        return Shoppingcart.from(shoppingcartWithItems);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create shoppingcart');
    }
};

const addItemToShoppingcart = async ({
    item,
    shoppingcart,
}: {
    item: Item;
    shoppingcart: Shoppingcart;
}) => {
    try {
        // Check if the item already exists in the cart
        const existingItem = await db.shoppingcartItems.findUnique({
            where: {
                shoppingcartId_itemId: {
                    shoppingcartId: shoppingcart.getId()!,
                    itemId: item.getId()!,
                },
            },
        });

        if (existingItem) {
            // If item exists, increment its quantity
            const shoppingcartPrisma = await db.shoppingcart.update({
                where: {
                    id: shoppingcart.getId(),
                },
                data: {
                    items: {
                        update: {
                            where: {
                                shoppingcartId_itemId: {
                                    shoppingcartId: shoppingcart.getId()!,
                                    itemId: item.getId()!,
                                },
                            },
                            data: {
                                quantity: existingItem.quantity + 1,
                            },
                        },
                    },
                },
                include: {
                    items: {
                        include: {
                            item: true,
                        },
                    },
                    user: true,
                },
            });

            return shoppingcartPrisma ? Shoppingcart.from(shoppingcartPrisma) : undefined;
        } else {
            // If item doesn't exist, create new relationship with quantity 1
            const shoppingcartPrisma = await db.shoppingcart.update({
                where: {
                    id: shoppingcart.getId(),
                },
                data: {
                    items: {
                        create: {
                            itemId: item.getId()!,
                            quantity: 1,
                        },
                    },
                },
                include: {
                    items: {
                        include: {
                            item: true,
                        },
                    },
                    user: true,
                },
            });

            return shoppingcartPrisma ? Shoppingcart.from(shoppingcartPrisma) : undefined;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Could not add item to shoppingcart');
    }
};

export default {
    getAll,
    getById,
    addItemToShoppingcart,
    create,
};
