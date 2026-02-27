'use strict'

import * as publicationService from './publication.service.js'

export const createPublication = async (req, res) => {
  try {
    const publication = await publicationService.createPublication(
      req.body,
      req.user.id   
    )

    res.status(201).json(publication)

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const getPublications = async (req, res) => {
  try {
    const publications = await publicationService.getPublications()
    res.json(publications)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getPublicationById = async (req, res) => {
  try {
    const publication = await publicationService.getPublicationById(req.params.id)
    res.json(publication)
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

export const updatePublication = async (req, res) => {
  try {
    const publication = await publicationService.updatePublication(
      req.params.id,
      req.body,
      req.user.id   
    )

    res.json(publication)

  } catch (error) {
    if (error.message === 'No autorizado') {
      return res.status(403).json({
        success: false,
        message: error.message
      })
    }

    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const deletePublication = async (req, res) => {
  try {
    await publicationService.deletePublication(
      req.params.id,
      req.user.id   
    )

    res.json({
      success: true,
      message: 'Publicación eliminada correctamente'
    })

  } catch (error) {
    if (error.message === 'No autorizado') {
      return res.status(403).json({
        success: false,
        message: error.message
      })
    }

    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}