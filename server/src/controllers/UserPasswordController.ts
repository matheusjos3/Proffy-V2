import { Request, Response } from 'express'
import db from '../database/connection'
import crypto1 from 'crypto'
import path from 'path'
import fs from 'fs'
import mailer from '../mail/mailer'
import Handlebars from 'handlebars'
import { isAfter } from 'date-fns'
import bcrypt from 'bcrypt';
import { isEmpty } from '../utils/isEmpty'

export default class UserPasswordController {
  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      isEmpty(email)
    } catch (error) {
      response.status(400).json(error)
    }

    const userEmail = await db('users')
      .select('email', 'id', 'name')
      .where('email', email)
      .first()

    if (!userEmail) {
      return response.status(400).json({ erro: 'Este Email não está relacionado a uma conta.' })
    }

    const token = crypto1.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    await db('users')
      .update({ passwordResetToken: token, passwordResetExpires: now })
      .where('id', userEmail.id)

    const dir_templete = path.resolve(__dirname, '..', 'mail', 'views', 'forgot_password.html');
    const mail_templete = fs.readFileSync(dir_templete, 'utf-8');

    const templete = Handlebars.compile(mail_templete)

    mailer.sendMail({
      from: {
        name: 'Suporte Proffy',
        address: 'suporte@proffy.com',
      },
      to: {
        name: userEmail.name,
        address: email
      },
      subject: 'Redefinição de senha',
      html: templete({
        name: userEmail.name,
        link: `${process.env.WEB_TEST_URL}/reset-password?token=${token}`
      })
    })
      .then(res => response.status(200).json(res))
      .catch(error => response.status(400).json(error))
  }

  async resetPassword(request: Request, response: Response) {
    const { password, token } = request.body

    try {
      isEmpty(password)
      isEmpty(token)
    } catch (error) {
      response.status(400).json(error)
    }

    const userByToken = await db('users')
      .select('id', 'passwordResetToken', 'passwordResetExpires')
      .where('passwordResetToken', token)
      .first()

    if (userByToken === undefined) {
      return response.status(400).json({ error: 'O token informado é inválido' })
    }

    const now = new Date()

    if (isAfter(now, userByToken.passwordResetExpires)) {
      return response.status(401).json({ error: 'O token informado expirou.' })
    }

    const salt = bcrypt.genSaltSync(10)
    const encrypted = bcrypt.hashSync(password, salt)

    await db('users')
      .update({
        password: encrypted,
        passwordResetToken: ''
      })
      .where('id', userByToken.id)
      .then(() => response.status(200).send())
      .catch(() => response.status(400).json({ error: 'Não conseguimos atualizar sua senha, tente novamente.' }))
  }
}