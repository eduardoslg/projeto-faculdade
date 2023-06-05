import { Request, Response } from 'express'

import { GetPlayersService } from '../../services/person/GetPlayersService'

class GetPlayersController {
  async execute(req: Request, res: Response) {
    const getPlayersService = new GetPlayersService()

    const players = await getPlayersService.execute()
    return res.json(players)
  }
}

export { GetPlayersController }
