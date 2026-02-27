import Comment from './comment.model.js'
import mongoose from 'mongoose'

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido')
  }
}

export const createComment = async (data, userId) => {
  const { publicationId, content } = data

  if (!publicationId || !content) {
    throw new Error('publicationId y content son obligatorios')
  }

  validateObjectId(publicationId)

  return await Comment.create({
    publicationId,
    content,
    author: userId
  })
}

export const getCommentsByPublication = async (publicationId) => {
  validateObjectId(publicationId)

  return await Comment.find({ publicationId })
}

export const updateComment = async (id, content, userId) => {
  validateObjectId(id)

  if (!content) {
    throw new Error('Content es obligatorio')
  }

  const comment = await Comment.findById(id)

  if (!comment) {
    throw new Error('Comentario no encontrado')
  }

  if (comment.author !== userId) {
    throw new Error('No autorizado')
  }

  comment.content = content
  await comment.save()

  return comment
}

export const deleteComment = async (id, userId) => {
  validateObjectId(id)

  const comment = await Comment.findById(id)

  if (!comment) {
    throw new Error('Comentario no encontrado')
  }

  if (comment.author !== userId) {
    throw new Error('No autorizado')
  }

  await comment.deleteOne()
}