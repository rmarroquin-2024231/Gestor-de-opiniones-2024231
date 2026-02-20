'use strict';

import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization token required'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Invalid token format'
        });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
});

// 🔥 FIX DEFINITIVO
req.user = {
    id: decoded.sub || decoded.id || 'unknown',
    name:
        decoded.unique_name ||
        decoded.name ||
        decoded.username ||
        decoded.email ||
        'anonymous',
    email: decoded.email || 'no-email',
    role: decoded.role || 'USER'
};

console.log('USER NORMALIZED:', req.user);

next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};