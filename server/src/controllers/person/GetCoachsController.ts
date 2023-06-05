import { Request, Response } from 'express'

import { GetCoachsService } from '../../services/person/GetCoachsService'

class GetCoachsController {
  async execute(req: Request, res: Response) {
    const getCoachsService = new GetCoachsService()

    const person = await getCoachsService.execute()
    return res.json(person)
  }
}

export { GetCoachsController }
