import { Request, Response } from 'express'

import { GetCoachsModel } from '../../models/person/GetCoachsModel'

class GetCoachsController {
  async execute(req: Request, res: Response) {
    const getCoachsModel = new GetCoachsModel()

    const person = await getCoachsModel.execute()
    return res.json(person)
  }
}

export { GetCoachsController }
