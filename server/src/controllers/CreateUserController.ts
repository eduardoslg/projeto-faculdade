import { Request, Response } from 'express'

import { CreateUserModel } from '../models/CreateUserModel'

class CreateUserController {
  async execute(req: Request, res: Response) {
    const newUser = req.body

    const createUserModel = new CreateUserModel()

    const person = await createUserModel.execute(newUser)
    return res.json(person)
  }
}

export { CreateUserController }
