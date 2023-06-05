import { Request, Response } from 'express'

import { AuthUserModel } from '../models/AuthUserModel'

class AuthUserController {
  async execute(req: Request, res: Response) {
    const { username, password } = req.body

    const authUserModel = new AuthUserModel()

    const auth = await authUserModel.execute({
      username,
      password,
    })

    return res.json(auth)
  }
}

export { AuthUserController }
