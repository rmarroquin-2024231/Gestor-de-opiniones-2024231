'use strict'

import * as commentService from './comment.service.js'

export const createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(
      req.body,
      req.user.id
    )

    res.status(201).json(comment)

  } catch (error) {
    next(error)
  }
}

export const getCommentsByPublication = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByPublication(
      req.params.publicationId
    )

    res.status(200).json(comments)

  } catch (error) {
    next(error)
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(
      req.params.id,
      req.body.content,
      req.user.id
    )

    res.status(200).json(comment)

  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(
      req.params.id,
      req.user.id
    )

    res.status(200).json({
      message: 'Comentario eliminado correctamente'
    })

  } catch (error) {
    next(error)
  }
}