import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const  adminToken  = req.cookies && req.cookies.adminToken;
        if (!adminToken) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated. Please log in again.',
            });
        }

        const token_decode = jwt.verify(adminToken, process.env.JWT_SECRET);
        const { email } = token_decode;
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized. Please log in again.',
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default authAdmin;
