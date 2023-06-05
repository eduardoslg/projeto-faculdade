import prismaClient from '../../prisma'

interface Player {
  personId: number | undefined
  nomeCamisa: string | undefined
  numGolCarreira: number | undefined
  posicaoJoga: string | undefined
}

interface Tecnico {
  apelido: string | undefined
  anosExperiencia: number | undefined
  tempoContrato: number | undefined
}

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
  player?: Player | null
  tecnico?: Tecnico | null
}

class CreatePersonService {
  async execute(person: Person) {
    if (!person.nome) {
      throw new Error('Nome é necessário.')
    }

    if (!person.username) {
      throw new Error('Username é necessário.')
    }

    if (!person.password) {
      throw new Error('Senha é necessária.')
    }

    const personAlreadyExists = await prismaClient.person.findFirst({
      where: {
        nome: person.username,
      },
    })

    if (personAlreadyExists) {
      throw new Error('Esse usuário já existe')
    }

    const isPlayer = person.type === 'J'
    const isCoach = person.type === 'T'
    const date = new Date(person.anoNasc)

    let pessoa: any
    let tipoPessoa: any

    if (isPlayer) {
      pessoa = await prismaClient.person.create({
        data: {
          nome: person.nome,
          username: person.username,
          anoNasc: date,
          idade: person.idade,
          altura: person.altura,
          peso: person.peso,
          salario: person.salario,
          password: person.password,
          type: person.type,
          Jogador: {
            create: {
              nomeCamisa: person.player?.nomeCamisa,
              posicaoJoga: person.player?.posicaoJoga,
              numGolCarreira: person.player?.numGolCarreira,
            } as any,
          },
        },
        include: {
          Jogador: true,
        },
      })

      tipoPessoa = pessoa?.jogador
    }

    if (isCoach) {
      pessoa = await prismaClient.person.create({
        data: {
          nome: person.nome,
          username: person.username,
          anoNasc: date,
          idade: person.idade,
          altura: person.altura,
          peso: person.peso,
          salario: person.salario,
          password: person.password,
          type: person.type,
          Tecnico: {
            create: {
              apelido: person.tecnico?.apelido,
              anosExperiencia: person.tecnico?.anosExperiencia,
              tempoContrato: person.tecnico?.tempoContrato,
            } as any,
          },
        },
        include: {
          Tecnico: true,
        },
      })

      tipoPessoa = pessoa?.tecnico
    }

    return { pessoa, tipoPessoa }
  }
}

export { CreatePersonService }
