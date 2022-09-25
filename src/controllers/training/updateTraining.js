const { Training } = require('../models')
const { RequestError } = require('../../helpers')

const updateTraining = async (req, res) => {
    const { _id: owner } = req.user
    const id = owner
    const { body } = req
    try {
        const currentTraining = await Training.find(owner)
        const newResults = currentTraining.results.push({ ...body })
        const updatedTraining = await Training.findByIdAndUpdate(id, { results: newResults }, { new: true })
        res.status(200).json(updatedTraining)
    } catch (error) {
        throw RequestError(error.status, error.message)
    }
}

module.exports = updateTraining