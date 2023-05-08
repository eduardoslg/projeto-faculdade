import { Router } from 'express'

import { CreateUserController } from './controllers/person/CreatePersonController'

const router = Router()

router.post('/persons', new CreateUserController().execute)

export { router }
