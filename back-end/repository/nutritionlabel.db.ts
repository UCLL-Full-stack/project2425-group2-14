import { Nutritionlabel } from '../model/nutritionlabel';

const nutritionlabels = [
    new Nutritionlabel({
        energy: 100,
        fat: 10,
        saturatedFats: 5,
        carbohydrates: 20,
        sugar: 10,
        protein: 5,
        salts: 0.5,
    }),

    new Nutritionlabel({
        energy: 200,
        fat: 20,
        saturatedFats: 10,
        carbohydrates: 40,
        sugar: 20,
        protein: 10,
        salts: 1,
    }),
];

const getAll = (): Nutritionlabel[] => {
    try {
        return nutritionlabels;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all nutritionlabels');
    }
};

export default {
    getAll,
};