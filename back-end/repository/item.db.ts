import { Item } from '../model/item';
import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Item[]> => {
    try {
        const items = await db.item.findMany({
            orderBy: { id: 'asc' },
            include: { nutritionlabel: true },
        });
        return Promise.all(items.map((item) => Item.from(item)));
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const create = async (item: Item): Promise<Item> => {
    try {
        const nutritionLabel = item.getNutritionLabel();

        const data: any = {
            name: item.getName(),
            price: item.getPrice(),
            pathToImage: item.getPathToImage(),
            category: item.getCategory(),
        };

        if (nutritionLabel) {
            data.nutritionlabel = { connect: { id: nutritionLabel.getId() } };
        }

        const createdItem = await db.item.create({
            data,
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

const addNutritionlabel = async (item: Item, nutritionlabel: Nutritionlabel): Promise<Item> => {
    try {
        item.setNutritionLabel(nutritionlabel);
        const updatedItem = await db.item.update({
            where: { id: item.getId() },
            data: {
                nutritionlabelId: nutritionlabel.getId(),
            },
        });
        return Item.from(updatedItem);
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
