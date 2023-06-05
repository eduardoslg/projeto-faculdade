import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

const JWT_SECRET = '98388750f63fac47136942aaf8ac79ce'

export function isAuthenticated(
  req: Request | any,
  res: Response,
  next: NextFunction,
) {
  // Receber o token
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    // Validar esse token.
    const { sub } = verify(token, JWT_SECRET) as Payload

    // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
    req.id = sub

    return next()
  } catch (err) {
    return res.status(401).end()
  }
}
