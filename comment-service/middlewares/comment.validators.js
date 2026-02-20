'use strict';

import mongoose from 'mongoose';

export const validateCreateComment = (req, res, next) => {
    const { publicationId, content } = req.body;

    if (!publicationId || !mongoose.Types.ObjectId.isValid(publicationId)) {
        return res.status(400).json({
            message: 'Invalid or missing publicationId'
        });
    }

    if (!content || content.trim().length === 0) {
        return res.status(400).json({
            message: 'Content is required'
        });
    }

    next();
};

export const validateCommentId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid comment ID'
        });
    }

    next();
};