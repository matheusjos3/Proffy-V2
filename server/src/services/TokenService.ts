import jwt from 'jsonwebtoken';

interface Payload {
    id: number,
    name: string,
    last_name: string,
    avatar: string
}

export function generateToken(payload: Payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 18000 //5 hours
    })
}

export function decodeToken(token: string) {
    return jwt.decode(token)
}