export const authenticateToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado: Token requerido' });
    jwt.verify(token, 'tu_clave_secreta', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};
