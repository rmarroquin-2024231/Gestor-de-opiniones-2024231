'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';

import publicationRoutes from '../src/publications/publication.routes.js';

const BASE_PATH = '/GDO/v1';

/**
 * Global middlewares
 */
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

/**
 * Application routes
 */
const routes = (app) => {

    // Health check del microservicio
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            status: 'healthy',
            service: 'GDO publication service'
        });
    });

    // Rutas del microservicio de publicaciones
    app.use(`${BASE_PATH}/publications`, publicationRoutes);
};

/**
 * Server bootstrap
 */
export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3033;

    app.set('trust proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);

        app.listen(PORT, () => {
            console.log(`PublicationService running on port: ${PORT}`);
        });

    } catch (error) {
        console.error(`Error al iniciar el servidor: ${error.message}`);
        process.exit(1);
    }
};