import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token requerido' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        });

        // 🔑 Normalización de usuario (clave)
        req.user = {
            id: decoded.sub,          // .NET usa sub
            email: decoded.email,
            role: decoded.role
        };

        next();

    } catch (error) {
        console.error('JWT error:', error.message);
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};