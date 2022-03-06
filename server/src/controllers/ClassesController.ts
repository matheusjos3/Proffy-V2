import { Request, Response } from 'express'
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

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

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string
        const page = Number(filters.page) || 1
        let classes: Array<ClassItem> = []

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        const class_list = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*').from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from`<= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to`> ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
            .select('classes.id as id_class', 'classes.subject', 'classes.cost', 'classes.user_id', 'users.name',
                'users.last_name', 'users.whatsapp', 'users.avatar', 'users.bio', 'class_schedule.*')
            .limit(10)
            .offset((page - 1) * 10)

        class_list.forEach(item => {
            const { id_class, subject, cost, user_id, avatar, name, last_name, whatsapp, bio, week_day, from, to, class_id } = item

            classes[item.id_class] = classes[item.id_class] || {
                id_class, subject, cost, user_id, avatar, name, last_name, whatsapp, bio,
                schedules: []
            }

            classes[item.id_class].schedules.push({
                week_day, from, to, class_id
            })
        })

        classes = classes.filter(item => item !== null)

        return response.status(200).json(classes)
    }

    async create(request: Request, response: Response) {
        const {
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
            user_id
        } = request.body;

        const trx = await db.transaction();

        try {
            await trx('users').update({
                bio,
                whatsapp
            }).where('id', user_id)

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            await trx('class_schedule').insert(classSchedule);

            await trx.commit()

            return response.status(200).send();

        } catch (err) {
            await trx.rollback();
            return response.status(400).send(err)
        }
    }
}