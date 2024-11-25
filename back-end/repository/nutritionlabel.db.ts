import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Nutritionlabel[]> => {
    try {
        const nutritionlabels = await db.nutritionlabel.findMany({ orderBy: { id: 'asc' } });
        return nutritionlabels.map((nutritionlabel) => {
            return Nutritionlabel.from(nutritionlabel);
        });
    } catch (error) {
        console.log(error);
        throw new Error(`Database Error : ${error}`);
    }
};

const getById = async (id: number): Promise<Nutritionlabel | undefined> => {
    try {
        const nutritionlabel = await db.nutritionlabel.findUnique({ where: { id } });
        return nutritionlabel ? Nutritionlabel.from(nutritionlabel) : undefined;
    } catch (error) {
        console.log(error);
        throw new Error(`Database error : ${error}`);
    }
};

const create = async (nutritionlabel: Nutritionlabel): Promise<Nutritionlabel> => {
    try {
        const createdNutritionlabel = await db.nutritionlabel.create({
            data: {
                energy: nutritionlabel.getEnergy(),
                fat: nutritionlabel.getFat(),
                saturatedFats: nutritionlabel.getSaturatedFats(),
                carbohydrates: nutritionlabel.getCarbohydrates(),
                sugar: nutritionlabel.getSugar(),
                protein: nutritionlabel.getProtein(),
                salts: nutritionlabel.getSalts(),
            },
        });

        return Nutritionlabel.from(createdNutritionlabel);
    } catch (error) {
        console.log(error);
        throw new Error('Could not create nutritionlabel');
    }
};

export default {
    getAll,
    getById,
    create,
};
