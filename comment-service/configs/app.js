'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';

import commentRoutes from '../src/comments/comment.routes.js';
import { errorHandler } from '../middlewares/error.middleware.js'; 

const BASE_PATH = '/GDO/v1';

const middlewares = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.get(`${BASE_PATH}/health`, (_, res) => {
        res.json({ status: 'healthy', service: 'comment-service' });
    });

    app.use(`${BASE_PATH}/comments`, commentRoutes);
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3044;

    try {
        middlewares(app);
        await dbConnection();
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () =>
            console.log(`CommentService running on port ${PORT}`)
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};