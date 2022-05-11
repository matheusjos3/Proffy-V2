import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connection';
import 'dotenv/config';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import { isEmpty } from '../utils/isEmpty';

interface ScheduleItem {
    id: number,
    week_day: number;
    from: string;
    to: string;
}

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

    async updateUser(request: Request, response: Response) {
        const {
            user_id, name, email, last_name, avatar, bio, whatsapp,
            subject, cost, schedule
        } = request.body

        try {
            isEmpty(user_id)
            isEmpty(name)
            isEmpty(email)
            isEmpty(last_name)
            isEmpty(bio)
            isEmpty(whatsapp)
            isEmpty(subject)
            isEmpty(cost)
            isEmpty(schedule)
        } catch (error) {
            return response.status(400).json({ error: error })
        }

        const isEmailAvailable = await db('users')
            .select('email', 'id')
            .where('email', email)
            .first()

        const user_class = await db('classes')
            .where('user_id', user_id)
            .first()

        if (isEmailAvailable && isEmailAvailable.id !== user_id) {
            return response.status(400).send("Este E-mail já está em uso.")
        }

        await db("users")
            .update({ email, name, last_name, avatar, bio, whatsapp })
            .where('id', user_id)

        if (user_class) {
            await db("classes")
                .update({ subject, cost })
                .where('user_id', user_id)

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    id: scheduleItem.id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            classSchedule.forEach(async (item: ScheduleItem) => {
                await db('class_schedule')
                    .update({
                        week_day: item.week_day,
                        from: item.from,
                        to: item.to
                    })
                    .where('id', item.id)
            })
        }

        return response.status(200).json({ status: 'Perfil Atualizado.' })

    }
}