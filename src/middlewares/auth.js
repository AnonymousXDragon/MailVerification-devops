const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    protect: async(req,res,next) => {
        try {
            if ( req.headers && req.headers.includes('authorization') ) {
                const token = req.headers['authorization'].split(' ')[1]
                const user = jwt.verify(token,process.env.JWT_SECRET_KEY)
                req.user = user;
                next()
            } else {
                return res.status(402).json({
                    "status": "unauthorized",
                    "error": "invalid token"
                })
            }
        } catch (error) {
            return res.status(500).json({
                "status": "unauthorized",
                "error": error.message
            })
        }
    },
}