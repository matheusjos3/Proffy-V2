import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

function autenticate(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) return response.status(401).send({ error: "No token provided" })

    const myToken = token.split(" ");

    jwt.verify(myToken[1], process.env.JWT_SECRET, (err) => {
        if (err) return response.status(401).send({ error: "Token invalid" })

        next()
    })
}

export default autenticate;