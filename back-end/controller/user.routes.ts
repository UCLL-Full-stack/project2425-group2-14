/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Operations related to user management and authentication
 *
 * components:
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [user, admin]
 *       description: The user's role in the system - can be either a regular user or administrator
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user
 *         email:
 *           type: string
 *           description: User's email address used for authentication and communication
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: User's hashed password for authentication
 *           format: password
 *         role:
 *           $ref: '#/components/schemas/Role'
 *           description: The user's role defining their permissions and access levels
 *       required:
 *         - email
 *         - password
 *         - role
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     description: Retrieves a list of all users in the system. Requires administrative privileges.
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { userRouter };
