import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
                password: encrypted
            })

            return response.status(200).send();

        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error.'
            })
        }
    }

    async login(request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;

        try {

            const user = await db('users')
                .where('email', email)
                .first()

            if (!user) return response.status(404).send('Usuario não encontrado.')

            const passwordIsValid = bcrypt.compareSync(password, user.password)

            if (!passwordIsValid) return response.status(400).send("A senha está incorreta")

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 43200
            })

            return response.status(200).send({ auth: true, token: token })

        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error.'
            })
        }
    }

    async getUserData(request: Request, response: Response) {
        const { user_id } = request.body

        try {
            const user = await db('users')
                .select('email', 'name', 'last_name', 'bio', 'avatar', 'whatsapp')
                .where('id', user_id)
                .first()

            if (!user) {
                return response.status(200).send('User not found')
            }

            const classes = await db('classes')
                .select('id', 'subject', 'cost')
                .where('user_id', user_id)
                .first()

            if (!classes) {
                return response.status(200).json({ user })
            }

            const schedules = await db('class_schedule')
                .select('*')
                .where('class_id', classes.id)

            return response.status(200).json({ user, classes, schedules })

        } catch (err) {
            return response.status(400).send(err)
        }
    }
}

