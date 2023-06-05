import prismaClient from '../../prisma'

class GetPlayersModel {
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

export { GetPlayersModel }
