const { RequestError } = require('../../helpers')
const { trainingServices, booksServices } = require('../../services')

const getTraining = async (req, res) => {
    const { _id: owner } = req.user
    const currentTraining = await trainingServices.getTraining(owner)
    if (!currentTraining) throw RequestError(404, 'Not found')
    const { finishDate, books, completed, _id } = currentTraining
    const currentDate = new Date()
    if (finishDate.getTime() < currentDate.getTime() && !completed) {
        books.forEach(async book => {
            await booksServices.updateBookStatus(book._id, owner, { status: 'toRead' })
        })
        await trainingServices.deleteTraining(_id)
        throw RequestError(404, 'Not found')
    }
    if (completed) {
        await trainingServices.deleteTraining(_id)
        throw RequestError(404, 'Not found')
    }
    res.json(currentTraining)
}

module.exports = getTraining