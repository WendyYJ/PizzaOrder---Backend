const jwt = require('jsonwebtoken');

function generateToken(id) {
    const token = jwt.sign({id},process.env.JWT_KEY,{
        expiresIn:'1d'
    });
    return token;
}

function validateToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_KEY);
        return decoded
    }catch(e) {
        return null;
    }
}

module.exports = { generateToken, validateToken };