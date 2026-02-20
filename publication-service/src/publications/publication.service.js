import Publication from './publication.model.js'

const validate = ({ title, category, text }) => {
  if (!title || !category || !text) {
    throw new Error('All fields are required')
  }
}

export const create = async (data, userId) => {
  validate(data)
  return Publication.create({ ...data, author: userId })
}

export const getAll = async () => Publication.find()

export const getById = async (id) => {
  const pub = await Publication.findById(id)
  if (!pub) throw new Error('Not found')
  return pub
}

export const update = async (id, data, userId) => {
  const pub = await getById(id)
  if (pub.author.toString() !== userId) {
    throw new Error('Forbidden')
  }
  validate(data)
  return Publication.findByIdAndUpdate(id, data, { new: true })
}

export const remove = async (id, userId) => {
  const pub = await getById(id)
  if (pub.author.toString() !== userId) {
    throw new Error('Forbidden')
  }
  await pub.deleteOne()
}