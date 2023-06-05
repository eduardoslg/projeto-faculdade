import { hash } from 'bcryptjs'

import prismaClient from '../prisma'

interface Person {
  nome: string
  username: string
  anoNasc: string
  idade: number
  altura: number
  peso: number
  salario: number
  type: string
  password: string
}

class CreateUserModel {
  async execute(person: Person) {
    if (!person.nome) {
      throw new Error('Nome é necessário.')
    }

    if (!person.username) {
      throw new Error('Nome de usuário é necessário.')
    }

    if (!person.password) {
      throw new Error('Senha é necessária.')
    }

    const userAlreadyExists = await prismaClient.person.findFirst({
      where: {
        nome: person.username,
      },
    })

    if (userAlreadyExists) {
      throw new Error('Esse usuário já existe')
    }

    const passwordHash = await hash(person.password, 8)

    const date = new Date(person.anoNasc)

    const user = await prismaClient.person.create({
      data: {
        nome: person.nome,
        username: person.username,
        anoNasc: date,
        idade: person.idade,
        altura: person.altura,
        peso: person.peso,
        salario: person.salario,
        type: person.type,
        password: passwordHash,
      },
      select: {
        id: true,
        nome: true,
        username: true,
      },
    })

    return user
  }
}

export { CreateUserModel }
