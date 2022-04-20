import { Request, Response } from 'express';
import db from '../database/connection';

interface ClassItem {
    id_class: Number,
    subject: string,
    cost: Number,
    user_id: Number,
    avatar: string,
    name: string,
    last_name: string,
    whatsapp: string,
    bio: string,
    schedules: any
}

export default class FavoriteController {
    async index(request: Request, response: Response) {
        const { user_id } = request.body;
        let classes: Array<ClassItem> = []
        const page = Number(request.query.page) || 1

        const favorites_id = await db('favorites')
            .select('teacher_id')
            .where({ user_id })

        const classList = await db('classes')
            .join('users', 'classes.user_id', '=', 'users.id')
            .select('classes.id as id_class', 'classes.subject', 'classes.cost', 
                'classes.user_id', 'users.name',
                'users.last_name', 'users.whatsapp', 'users.avatar', 'users.bio')
            .whereIn('user_id', favorites_id.map(item => item.teacher_id))
            .limit(4)
            .offset((page - 1) * 4)

        const schedules = await db('class_schedule')
            .whereIn('class_id', classList.map(item => item.id_class))

        classList.forEach((item) => {
            classes[item.id_class] = classes[item.id_class] || { ...item, schedules: [] }
            classes[item.id_class].schedules = schedules.filter(sch => sch.class_id == item.id_class)
        })

        classes = classes.filter(item => item !== null)

        return response.status(200).json(classes)
    }

    async add(request: Request, response: Response) {
        const { user_id, teacher_id } = request.body

        await db('favorites')
            .insert({ user_id, teacher_id })
            .then(() => response.status(201).send())
            .catch(() => response.status(201).json({ error: 'Unexpected error.' }))
    }

    async remove(request: Request, response: Response) {
        const { user_id, teacher_id } = request.body

        await db('favorites')
            .where({ user_id, teacher_id })
            .del()
            .then(() => response.status(201).send())
            .catch(() => response.status(201).json({ error: 'Não foi possivel remover seu favorito.' }))
    }
}