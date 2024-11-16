import { Nutritionlabel } from '../model/nutritionlabel';
import db from './db';

const getAll = async (): Promise<Nutritionlabel[]> => {
    try {
        const nutritionlabels = await db.nutritionlabel.findMany();
        return nutritionlabels.map((nutritionlabel) => Nutritionlabel.from(nutritionlabel));
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all nutritionlabels');
    }
};

const create = async (nutritionlabel: Nutritionlabel): Promise<Nutritionlabel> => {
    try {
        const exists = await db.nutritionlabel.findUnique({
            where: { id: nutritionlabel.getId() },
        });

        if (exists) {
            throw new Error('Nutritionlabel already exists');
        }

        const createdNutritionlabel = await db.nutritionlabel.create({
            data: {
                id: nutritionlabel.getId()!,
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
    create,
};
