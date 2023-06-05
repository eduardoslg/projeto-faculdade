import prismaClient from '../../prisma'

class GetCoachsModel {
  async execute() {
    const coach = await prismaClient.person.findMany({
      where: {
        type: 'T',
      },
      include: {
        Tecnico: true,
      },
    })

    return coach
  }
}

export { GetCoachsModel }
