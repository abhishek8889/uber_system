const jwt = require("jsonwebtoken");
const envVariables = require("../config/envVariables");
const { errorResponse } = require("../utils/responseHandler");
const User = require("../modals/User");


exports.authMiddleware = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
        
            if (!token) {
                return res.status(401).json(errorResponse(req.t('error.something_went_wrong'), "Authentication required"));
            }

            const decoded = jwt.verify(token, envVariables.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(401).json(errorResponse(req.t('error.user_not_found'), "User not found."));
            }

            if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
                return res.status(403).json(errorResponse(req.t('error.insufficient_role'), "User not found."));
            }

            req.user = user;
            next();

        } catch (error) {
            console.log("ERROR in authentication::",error)

            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
            }
            return res.status(401).json({ success: false, message: 'Invalid authentication token' });
        }
    }
};