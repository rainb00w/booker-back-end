const { Training } = require('../models')
const { RequestError } = require('../../helpers')

const getTraining = async (req, res) => {
    const { _id: owner } = req.user
    try {
        const result = await Training.find(owner)
        res.status(200).json(result)
    } catch (error) {
        throw RequestError(error.status, error.message)
    }
}

module.exports = getTraining