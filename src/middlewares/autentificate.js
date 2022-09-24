const User = require("../models/user");
const { tokenVerify } = require("../services/tokenGeneration");
const createError = require("http-errors");


const authentificate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer") {
            const error = createError(401, "Not 1 authorized");
            throw error;
        }

        // ? Здесь может вылетить ошибка 500
        const userId = tokenVerify(token);

        const user = await User.findById(userId);
        if (!user || user.token === null) {
            const error = createError(401, "Not 2 authorized");
            throw error;
        }
        req.user = user;
        next();
    }
    catch (err) {
        if (!err.status) {
            err.status = 401;
            err.message = "Not 3 authorized";
        }
        next(err);
    }
};

module.exports = authentificate;