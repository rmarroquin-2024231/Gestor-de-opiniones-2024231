import { Router } from 'express'
import * as publicationController from './publication.controller.js'
import { validateJWT } from '../../middlewares/validate-JWT.js'

const router = Router()

router.post('/', validateJWT, publicationController.createPublication)
router.get('/', publicationController.getPublications)
router.get('/:id', publicationController.getPublicationById)
router.put('/:id', validateJWT, publicationController.updatePublication)
router.delete('/:id', validateJWT, publicationController.deletePublication)

export default router