import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection';
import 'dotenv/config';
import { decodeToken, generateToken } from '../services/TokenService';

export default class AuthenticationController {
    async login(request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;

        try {

            const user_db = await db('users')
                .select('id', 'name', 'last_name', 'avatar', 'password')
                .where('email', email)
                .first()

            if (!user_db) return response.status(400).send('Usuario não encontrado.')

            const passwordIsValid = bcrypt.compareSync(password, user_db.password)

            if (!passwordIsValid) return response.status(400).send("A senha está incorreta")

            const payload = {
                id: user_db.id,
                name: user_db.name,
                last_name: user_db.last_name,
                avatar: user_db.avatar
            }

            const token = generateToken(payload)

            return response.status(200).send({ payload, token: token })

        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error.'
            })
        }
    }

    async refreshToken(request: Request, response: Response) {
        const oldToken = request.body.oldToken || null;
        const id_user = request.body.id_user || null

        if (!oldToken) {
            return response.status(500).json({ error: 'Token não foi enviado' })
        }

        try {
            const decode = decodeToken(oldToken)
            const id_token = decode['id']

            if (id_user !== id_token) {
                return response.status(500).json({ error: 'Token inválido.' })
            }

            const user_db = await db('users')
                .select('id', 'name', 'last_name', 'avatar')
                .where('id', id_token)
                .first()

            if (!user_db) {
                return response.status(401).json({ error: 'Usuario não foi encontrado com esse token' })
            }

            const payload = {
                id: user_db.id,
                name: user_db.name,
                last_name: user_db.last_name,
                avatar: user_db.avatar
            }

            const new_token = generateToken(payload)

            return response.status(200).json({ payload, token: new_token })

        } catch (erro) {
            return response.status(400).json({
                error: 'Unexpected error.'
            })
        }
    }
}