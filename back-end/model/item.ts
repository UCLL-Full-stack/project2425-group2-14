import { Category } from '../types';
import { Nutritionlabel } from './nutritionlabel';

import { Item as ItemPrisma } from '@prisma/client';

export class Item {
    private id?: number;
    private name: string;
    private price: number;
    private pathToImage: string;
    private category: Category;
    private nutritionlabel!: Nutritionlabel;

    constructor(item: {
        id?: number;
        name: string;
        price: number;
        pathToImage: string;
        category: Category;
    }) {
        this.validate(item);
        this.id = item.id;
        this.name = item.name;
        this.price = item.price;
        this.pathToImage = item.pathToImage;
        this.category = item.category;
    }

    validate(item: { name: string; price: number; pathToImage: string; category: Category }) {
        if (!item.name) {
            throw new Error('Name is required');
        }

        if (!item.price) {
            throw new Error('Price is required');
        }

        if (item.price < 0) {
            throw new Error('Price should be a positive number');
        }

        if (!item.pathToImage) {
            throw new Error('Path to image is required');
        }

        if (!item.category) {
            throw new Error('Category is required');
        }
    }

    setId(id: number) {
        this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getPathToImage(): string {
        return this.pathToImage;
    }

    getCategory(): Category {
        return this.category;
    }

    getNutritionLabel(): Nutritionlabel {
        return this.nutritionlabel;
    }

    setNutritionLabel(nutritionlabel: Nutritionlabel) {
        this.nutritionlabel = nutritionlabel;
        nutritionlabel.setItem(this);
    }

    equals(item: Item): boolean {
        return (
            this.id === item.getId() &&
            this.name === item.getName() &&
            this.price === item.getPrice() &&
            this.pathToImage === item.getPathToImage() &&
            this.category === item.getCategory() &&
            this.nutritionlabel == item.getNutritionLabel()
        );
    }

    static from({ id, name, price, pathToImage, category }: ItemPrisma) {
        return new Item({ id, name, price, pathToImage, category });
    }
}
