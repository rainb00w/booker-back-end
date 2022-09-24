const bcrypt = require("bcrypt");

const passwordGeneration = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

const passwordCompare = async (password, hash) => {
    return bcrypt.compare(password, hash)
};


module.exports = { passwordGeneration, passwordCompare };