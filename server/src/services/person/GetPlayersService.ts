import prismaClient from '../../prisma'

class GetPlayersService {
  async execute() {
    const coach = await prismaClient.person.findMany({
      where: {
        type: 'J',
      },
      include: {
        Jogador: true,
      },
    })

    return coach
  }
}

export { GetPlayersService }
