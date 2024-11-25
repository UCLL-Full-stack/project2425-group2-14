import { set } from 'date-fns';
import bcrypt from 'bcrypt';
import db from '../repository/db';
import { Category, Role } from '@prisma/client';

const resetSequences = async () => {
    const tables = ['users', 'shoppingcarts', 'items', 'nutritionlabels'];

    for (const table of tables) {
        try {
            await db.$executeRawUnsafe(`ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1;`);
        } catch (error) {
            console.warn(`Sequence for table ${table} does not exist, skipping.`);
        }
    }
};

const main = async () => {
    await db.shoppingcart.deleteMany();
    await db.user.deleteMany();
    await db.item.deleteMany();
    await db.nutritionlabel.deleteMany();

    await resetSequences();

    const nutritionLabels = await Promise.all([
        db.nutritionlabel.create({
            data: {
                energy: 32,
                fat: 0.3,
                saturatedFats: 0.1,
                carbohydrates: 7.7,
                sugar: 4.9,
                protein: 0.7,
                salts: 0.01,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 70,
                fat: 0.2,
                saturatedFats: 0.0,
                carbohydrates: 15.8,
                sugar: 13.5,
                protein: 1.1,
                salts: 0.02,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 89,
                fat: 0.3,
                saturatedFats: 0.1,
                carbohydrates: 22.8,
                sugar: 12.2,
                protein: 1.1,
                salts: 0.01,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 50,
                fat: 0.5,
                saturatedFats: 0.2,
                carbohydrates: 10.0,
                sugar: 5.0,
                protein: 1.0,
                salts: 0.03,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 60,
                fat: 0.4,
                saturatedFats: 0.1,
                carbohydrates: 12.0,
                sugar: 6.0,
                protein: 0.8,
                salts: 0.02,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 75,
                fat: 0.6,
                saturatedFats: 0.2,
                carbohydrates: 14.0,
                sugar: 7.0,
                protein: 1.2,
                salts: 0.03,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 45,
                fat: 0.2,
                saturatedFats: 0.1,
                carbohydrates: 9.5,
                sugar: 5.5,
                protein: 0.9,
                salts: 0.02,
            },
        }),
        db.nutritionlabel.create({
            data: {
                energy: 55,
                fat: 0.3,
                saturatedFats: 0.1,
                carbohydrates: 11.0,
                sugar: 6.0,
                protein: 1.0,
                salts: 0.03,
            },
        }),
    ]);

    const items = await Promise.all([
        db.item.create({
            data: {
                name: 'Strawberry',
                price: 4.19,
                pathToImage:
                    'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[0].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Kaki',
                price: 3.99,
                pathToImage:
                    'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[1].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Banana',
                price: 2.59,
                pathToImage:
                    'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[2].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Kiwi',
                price: 1.39,
                pathToImage:
                    'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[3].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Blueberries',
                price: 3.49,
                pathToImage:
                    'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[4].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Plum',
                price: 1.29,
                pathToImage:
                    'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[5].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Dragonfruit',
                price: 4.99,
                pathToImage:
                    'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[6].id } },
            },
        }),
        db.item.create({
            data: {
                name: 'Coconut',
                price: 6.79,
                pathToImage:
                    'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg',
                category: Category.fruits,
                nutritionlabel: { connect: { id: nutritionLabels[7].id } },
            },
        }),
    ]);

    const saltRounds = 10;
    const users = await Promise.all([
        db.user.create({
            data: {
                email: 'john.doe@mail.com',
                password: await bcrypt.hash('John123!', saltRounds),
                role: Role.user,
            },
        }),
        db.user.create({
            data: {
                email: 'jane.doe@mail.com',
                password: await bcrypt.hash('Jane123!', saltRounds),
                role: Role.user,
            },
        }),
    ]);

    await Promise.all([
        db.shoppingcart.create({
            data: {
                name: 'Shoppingcart 1',
                deliveryDate: set(new Date('2026-12-24'), { hours: 12, minutes: 0 }),
                userId: users[0].id,
                items: {
                    connect: [{ id: items[0].id }, { id: items[1].id }],
                },
            },
        }),
        db.shoppingcart.create({
            data: {
                name: 'Shoppingcart 2',
                deliveryDate: set(new Date('2026-09-16'), { hours: 12, minutes: 0 }),
                userId: users[1].id,
                items: {
                    connect: [{ id: items[2].id }, { id: items[3].id }],
                },
            },
        }),
    ]);
};

(async () => {
    try {
        await main();
        console.log('Database has been seeded successfully');
        await db.$disconnect();
    } catch (error) {
        console.error(error);
        await db.$disconnect();
        process.exit(1);
    }
})();
