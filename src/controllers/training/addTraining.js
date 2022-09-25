const { trainingServices, booksServices } = require('../../services')
const { RequestError } = require('../../helpers')

const addTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    for (const book of body.books) {
        const originalBook = await booksServices.getById({ bookId: book._id, owner })
        if (originalBook.status === 'haveRead') {
            throw RequestError(400, 'Chosen books have already been read.')
        }
    }
    const currentTraining = await trainingServices.getTraining(owner)
    if (currentTraining) {
        const currentDate = new Date()
        const { finishDate, _id } = currentTraining
        if (finishDate.getTime() >= currentDate.getTime()) {
            const difference = finishDate.getTime() - currentDate.getTime()
            const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
            throw RequestError(403, `Training is in progress. Try again in ${totalDays} days.`)
        } else {
            await trainingServices.deleteTraining(_id)
        }
    } 
    res.status(201).json(await trainingServices.addTraining(owner, body))
}

module.exports = addTraining