const jwt = require('jsonwebtoken');
 const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const docodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = docodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware