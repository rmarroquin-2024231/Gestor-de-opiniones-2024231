'use strict';

import Publication from './publication.model.js';

const createPublication = async (req, res) => {
    try {
        const { title, category, content, author, date } = req.body;

        if (!title || !category || !content || !author || !date) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const publication = new Publication({
            title,
            category,
            content,
            author,
            date
        });

        await publication.save();
        return res.status(201).json(publication);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPublications = async (req, res) => {
    const publications = await Publication.find();
    return res.json(publications);
};

const getPublicationById = async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'No encontrada' });
    return res.json(publication);
};

const updatePublication = async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'No encontrada' });

    if (publication.author !== req.body.author) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    Object.assign(publication, req.body);
    await publication.save();
    return res.json(publication);
};

const deletePublication = async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'No encontrada' });

    if (publication.author !== req.body.author) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    await publication.deleteOne();
    return res.json({ message: 'Eliminada' });
};

export default {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication
};