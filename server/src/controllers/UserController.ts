import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection';

export default class UserController {

    async create(request: Request, response: Response) {
        const {
            name,
            last_name,
            email,
            password
        } = request.body;

        try {
            const salt = bcrypt.genSaltSync(10)
            const encrypted = bcrypt.hashSync(password, salt)

            await db('users').insert({
                name, 
                last_name, 
                email, 
                password:encrypted
            })

            return response.status(200).send();

        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error.'
            })
        }
    }
}
