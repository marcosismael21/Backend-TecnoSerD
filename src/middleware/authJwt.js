const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.Usuario; // Asegúrate de que el nombre coincide con el definido en tu modelo
const { tokenVerificationError } = require("../utils/tokenManager");

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No Bearer");
        token = token.split(" ")[1];

        if (!token) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = id;

        const user = await User.findOne({
            where: { id: req.userId }
        });

        if (!user) {
            return res.status(404).send({
                message: "User not found!"
            });
        }

        next();
    } catch (error) {
        return res.status(401).send({
            error: tokenVerificationError[error.message] || "Unauthorized"
        });
    }
};

module.exports = verifyToken;
