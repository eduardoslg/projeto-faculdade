import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import prismaClient from '../prisma'

interface AuthRequest {
  username: string
  password: string
}

const JWT_SECRET = '98388750f63fac47136942aaf8ac79ce'

class AuthUserModel {
  async execute({ username, password }: AuthRequest) {
    // Verificar se o email existe.
    const user = await prismaClient.person.findFirst({
      where: {
        username,
      },
    })

    if (!user) {
      throw new Error('Usuário ou senha incorreta.')
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Usuário ou senha incorreta.')
    }

    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        name: user.nome,
        username: user.username,
      },
      JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d',
      },
    )

    return {
      id: user.id,
      name: user.nome,
      username: user.username,
      token,
    }
  }
}

export { AuthUserModel }
