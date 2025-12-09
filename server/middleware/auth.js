import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid token" });
    }
};

export default auth;