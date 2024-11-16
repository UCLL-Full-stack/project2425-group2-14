import { set } from 'date-fns';
import bcrypt from 'bcrypt';
import { PrismaClient, Category, Role } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.shoppingcart.deleteMany();
    await prisma.item.deleteMany();
    await prisma.nutritionlabel.deleteMany();

    const nutritionLabels = await Promise.all([
        prisma.nutritionlabel.create({
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
        prisma.nutritionlabel.create({
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
        prisma.nutritionlabel.create({
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
    ]);

    const items = await Promise.all([
        prisma.item.create({
            data: {
                name: 'Strawberry',
                price: 4.19,
                pathToImage:
                    'https://www.health.com/thmb/zvfL1rCWAPg3XzidfAqURuCmttk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberries-c5f434e7729e47c5b32c0deaa029386c.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[0].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Kaki',
                price: 3.99,
                pathToImage:
                    'https://www.fruitsnacks.be/media/cache/strip/uploads/media/5d2dc27ab1968/food-1056646-1280.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[1].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Banana',
                price: 2.59,
                pathToImage:
                    'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[2].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Kiwi',
                price: 1.39,
                pathToImage:
                    'https://www.health.com/thmb/YjD1m861zN2cGF4q9bbeu6now64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Kiwi-a2e9888bfab6474f8d12d2ae0287b356.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[0].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Blueberries',
                price: 3.49,
                pathToImage:
                    'https://images.squarespace-cdn.com/content/v1/58ebe6632994ca71ba304549/1491938746710-RE9ICCSBHSDYRFNJU5WG/image-asset.jpeg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[1].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Plum',
                price: 1.29,
                pathToImage:
                    'https://assets.idahopreferred.com/uploads/2023/09/07170427/Plums-scaled-1.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[2].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Dragonfruit',
                price: 4.99,
                pathToImage:
                    'https://gardenerspath.com/wp-content/uploads/2022/09/Best-Dragon-Fruit-Varieties-FB.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[0].id,
            },
        }),
        prisma.item.create({
            data: {
                name: 'Coconut',
                price: 6.79,
                pathToImage:
                    'https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg',
                category: Category.fruits,
                nutritionlabelId: nutritionLabels[1].id,
            },
        }),
    ]);

    const saltRounds = 10;
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'john.doe@mail.com',
                password: await bcrypt.hash('John123!', saltRounds),
                role: Role.user,
            },
        }),
        prisma.user.create({
            data: {
                email: 'jane.doe@mail.com',
                password: await bcrypt.hash('Jane123!', saltRounds),
                role: Role.user,
            },
        }),
    ]);

    const shoppingCarts = await Promise.all([
        prisma.shoppingcart.create({
            data: {
                name: 'Shoppingcart 1',
                deliveryDate: set(new Date('2026-12-24'), { hours: 12, minutes: 0 }),
                userId: users[0].id,
                items: {
                    connect: [{ id: items[0].id }, { id: items[1].id }],
                },
            },
        }),
        prisma.shoppingcart.create({
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
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
