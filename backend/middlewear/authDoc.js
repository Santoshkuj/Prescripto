import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const  docToken  = req.cookies && req.cookies.docToken;
        if (!docToken) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated. Please log in again.',
            });
        }

        const token_decode = jwt.verify(docToken, process.env.JWT_SECRET);
        req.body.docId = token_decode.id

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default authDoctor;
