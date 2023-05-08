import prismaClient from '../../prisma'

interface Player {
  personId: number
  nomeCamisa: string
  numGolCarreira: number
  posicaoJoga: string
}

interface Person {
  nome: string
  anoNasc: string
  idade: number
  altura: number
  peso: number
  salario: number
  type: string
  password: string
}

class CreatePersonService {
  async execute(person: Person) {
    if (!person.nome) {
      throw new Error('Nome incorreto.')
    }

    const personAlreadyExists = await prismaClient.person.findFirst({
      where: {
        nome: person.nome,
      },
    })

    if (personAlreadyExists) {
      throw new Error('Pessoa já existe')
    }

    const newPerson = await prismaClient.person.create({
      data: person,
    })

    const isJogador = newPerson.type === 'J'

    if (isJogador) {
      const teste = await prismaClient.jogador.create({
        data: {
          personId: newPerson.id,
          nomeCamisa,
          numGolCarreira,
          posicaoJoga,
        },
      })
    }

    return newPerson
  }
}

export { CreatePersonService }
