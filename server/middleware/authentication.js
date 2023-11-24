const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (!authToken) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const token = authToken.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = authentication;