import { Item, Nutritionlabel } from "@types";


const getAllItems = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

};

const getItemById = async (itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const addItemToCart = async (itemId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId })
    });
};

const addNutritionlabelToItem = async (itemId: number, nutritionLabel: Nutritionlabel) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/items/${itemId}/addNutritionlabel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nutritionLabel)
        });
    } catch (error) {
        console.error(error);
    }

}

const ItemsService = { getAllItems, getItemById, addItemToCart, addNutritionlabelToItem };

export default ItemsService;