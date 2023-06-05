import { Request, Response } from 'express'

import { GetPlayersModel } from '../../models/person/GetPlayersModel'

class GetPlayersController {
  async execute(req: Request, res: Response) {
    const getPlayersModel = new GetPlayersModel()

    const players = await getPlayersModel.execute()
    return res.json(players)
  }
}

export { GetPlayersController }
