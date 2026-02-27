'use strict';

import { Router } from 'express';

import {
  createComment,
  getCommentsByPublication,
  updateComment,
  deleteComment
} from './comment.controller.js';

import { authenticate } from '../../middlewares/auth.middleware.js';
import {
  validateCreateComment,
  validateCommentId
} from '../../middlewares/comment.validators.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateCreateComment,
  createComment
);

router.get(
  '/publication/:publicationId',
  authenticate,
  getCommentsByPublication
);

router.put(
  '/:id',
  authenticate,
  validateCommentId,
  updateComment
);

router.delete(
  '/:id',
  authenticate,
  validateCommentId,
  deleteComment
);

export default router;