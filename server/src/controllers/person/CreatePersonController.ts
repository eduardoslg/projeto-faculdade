import { Request, Response } from 'express'

import { CreatePersonService } from '../../services/person/CreatePersonService'

class CreateUserController {
  async execute(req: Request, res: Response) {
    const newPerson = req.body

    const createPersonService = new CreatePersonService()

    const person = await createPersonService.execute(newPerson)
    return res.json(person)
  }
}

export { CreateUserController }
