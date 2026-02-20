'use strict';

import Comment from './comment.model.js';

/**
 * Create comment
 */
export const createComment = async (req, res, next) => {
    try {
        const { publicationId, content } = req.body;

        if (!req.user || !req.user.name) {
            return res.status(401).json({
                message: 'User not authenticated correctly'
            });
        }

        const comment = await Comment.create({
            publicationId,
            content,
            author: req.user.name
        });

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

/**
 * Get comments by publication
 */
export const getCommentsByPublication = async (req, res, next) => {
    try {
        const { publicationId } = req.params;

        const comments = await Comment.find({ publicationId });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

/**
 * Update comment (only author)
 */
export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        if (comment.author !== req.user.username) {
            return res.status(403).json({
                message: 'Not authorized to edit this comment'
            });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({
            message: 'Comment updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete comment (only author)
 */
export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        if (comment.author !== req.user.username) {
            return res.status(403).json({
                message: 'Not authorized to delete this comment'
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};