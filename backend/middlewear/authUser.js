import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const  userToken  = req.cookies && req.cookies.userToken;
        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated. Please log in again.',
            });
        }

        const token_decode = jwt.verify(userToken, process.env.JWT_SECRET);
        req.body.userId = token_decode.id

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default authUser;
