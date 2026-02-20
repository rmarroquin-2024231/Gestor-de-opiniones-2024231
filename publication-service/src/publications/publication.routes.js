import { Router } from 'express';
import publicationController from './publication.controller.js';

const router = Router();

router.post('/', publicationController.createPublication);
router.get('/', publicationController.getPublications);
router.get('/:id', publicationController.getPublicationById);
router.put('/:id', publicationController.updatePublication);
router.delete('/:id', publicationController.deletePublication);

export default router;