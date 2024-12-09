import { Shoppingcart } from '@types';

const addShoppingcart = async (shoppingcart: Shoppingcart) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + '/shoppingcarts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('loggedInUser')}`,
            },
            body: JSON.stringify(shoppingcart),
        });
    } catch (error) {
        console.error(error);
    }
};

const ShoppingcartService = {
    addShoppingcart,
};

export default ShoppingcartService;
