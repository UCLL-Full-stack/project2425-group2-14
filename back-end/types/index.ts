type Role = 'user' | 'admin';
type Category = 'fruits' | 'vegetables' | 'dairys';

type ItemInput = {
    id?: number;
    name: string;
    price: number;
    pathToImage: string;
    category: Category;
    nutritionlabel?: NutritionlabelInput;
};

type NutritionlabelInput = {
    id?: number;
    energy: number;
    fat: number;
    saturatedFats: number;
    carbohydrates: number;
    sugar: number;
    protein: number;
    salts: number;
};

type ShoppingcartInput = {
    id?: number;
    name: string;
    deliveryDate: Date;
};

type UserInput = {
    id?: number;
    email: string;
    password: string;
    role: Role;
};

export { Role, Category, ItemInput, NutritionlabelInput, ShoppingcartInput, UserInput };
