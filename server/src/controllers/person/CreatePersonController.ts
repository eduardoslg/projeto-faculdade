import { Request, Response } from 'express'

import { CreatePersonModel } from '../../models/person/CreatePersonModel'

class CreatePersonController {
  async execute(req: Request, res: Response) {
    const newPerson = req.body

    const createPersonModel = new CreatePersonModel()

    const person = await createPersonModel.execute(newPerson)
    return res.json(person)
  }
}

export { CreatePersonController }
