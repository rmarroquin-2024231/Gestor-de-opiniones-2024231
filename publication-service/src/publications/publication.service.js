import Publication from './publication.model.js'
import mongoose from 'mongoose'

const validateData = ({ title, category, content, date }) => {
  if (!title || !category || !content || !date) {
    throw new Error('Todos los campos son obligatorios')
  }

  if (isNaN(Date.parse(date))) {
    throw new Error('Fecha inválida')
  }
}

export const createPublication = async (data, userId) => {
  validateData(data)

  return await Publication.create({
    ...data,
    author: userId
  })
}

export const getPublications = async () => {
  return await Publication.find()
}

export const getPublicationById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido')
  }

  const publication = await Publication.findById(id)

  if (!publication) {
    throw new Error('Publicación no encontrada')
  }

  return publication
}

export const updatePublication = async (id, data, userId) => {
  const publication = await getPublicationById(id)

  if (publication.author !== userId) {
    throw new Error('No autorizado')
  }

  validateData(data)

  return await Publication.findByIdAndUpdate(id, data, { new: true })
}

export const deletePublication = async (id, userId) => {
  const publication = await getPublicationById(id)

  if (publication.author !== userId) {
    throw new Error('No autorizado')
  }

  await publication.deleteOne()
}