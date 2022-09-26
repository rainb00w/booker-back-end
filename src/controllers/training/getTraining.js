const { RequestError } = require('../../helpers')
const { trainingServices } = require('../../services')

const getTraining = async (req, res) => {
    const { _id: owner } = req.user
    const result = await trainingServices.getTraining(owner)
    if (!result) throw RequestError(404, 'Not found')
    res.json(result)
}

module.exports = getTraining