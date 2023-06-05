import { Router } from 'express'

import { AuthUserController } from './controllers/AuthUserController'
import { CreateUserController } from './controllers/CreateUserController'
import { CreatePersonController } from './controllers/person/CreatePersonController'
import { GetCoachsController } from './controllers/person/GetCoachsController'
import { GetPlayersController } from './controllers/person/GetPlayersController'
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

router.post('/user', new CreateUserController().execute)
router.post('/session', new AuthUserController().execute)

router.post('/persons', isAuthenticated, new CreatePersonController().execute)
router.get('/coachs', isAuthenticated, new GetCoachsController().execute)
router.get('/players', isAuthenticated, new GetPlayersController().execute)

export { router }
