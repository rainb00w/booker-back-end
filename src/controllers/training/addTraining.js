const { Training } = require('../models')
const { RequestError } = require('../../helpers')

const addTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    try {
        const currentTraining = await Training.find(owner)
        if (currentTraining) {
            if (currentTraining.finishDate > Date.now) {
                const difference = currentTraining.finishDate.getTime() - Date.now.getTime()
                const totalDays = Math.ceil(difference / (1000 * 3600 / 24))
                RequestError(400, `Поточне тренування не завершене. Спробуйте створити нове тренування через ${totalDays} днів.`)
            }
        } else {
            const result = await Training.create({ ...body, owner })
            res.status(201).json(result)
        }
    } catch (error) {
        throw RequestError(error.status, error.message)
    }
}

module.exports = addTraining