import { Request, Response } from 'express'
import db from '../database/connection';

export default class ScheduleController {
    async addSchedule(request: Request, response: Response) {
        const { week_day, from, to, class_id } = request.body

        try {
            const insertedSchedule = await db('class_schedule').insert({ week_day, from, to, class_id })
            const schedule_id = insertedSchedule[0]

            return response.status(200).json({ id: schedule_id })
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possivel adicionar o horário' })
        }
    }

    async removeSchedule(request: Request, response: Response) {
        const { id } = request.body

        try {
            await db('class_schedule').del().where('id', id)
            return response.status(200).json({ message: 'Horario excluido!.' })
        } catch (error) {
            return response.status(400).json({ message: 'Não foi possivel remover o horário' })
        }
    }

}