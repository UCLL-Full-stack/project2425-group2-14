import { Item } from '../model/item';
import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Item[]> => {
    try {
        const items = await db.item.findMany();
        return items.map((item) => Item.from(item));
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const create = async (item: Item): Promise<Item> => {
    try {
        const exists = await db.item.findUnique({ where: { id: item.getId() } });

        if (exists) {
            throw new Error('Item already exists');
        }

        const createdItem = await db.item.create({
            data: {
                id: item.getId()!,
                name: item.getName(),
                price: item.getPrice(),
                pathToImage: item.getPathToImage(),
                category: item.getCategory(),
                nutritionlabelId: item.getNutritionLabel().getId()!,
            },
        });
        return Item.from(createdItem);
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const getById = async (id: number): Promise<Item | undefined> => {
    try {
        const item = await db.item.findUnique({ where: { id } });
        return item ? Item.from(item) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

const addNutritionlabel = (item: Item, nutritionlabel: Nutritionlabel): Item => {
    try {
        item.setNutritionLabel(nutritionlabel);
        return item;
    } catch (error) {
        console.log(error);
        throw new Error('Could not add nutritionlabel to item');
    }
};

const deleteItem = async (id: number): Promise<string> => {
    try {
        const item = await db.item.findUnique({ where: { id } });

        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }

        await db.item.delete({ where: { id } });

        return `Item ${item.name} deleted`;
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

export default {
    getAll,
    create,
    getById,
    addNutritionlabel,
    deleteItem,
};
