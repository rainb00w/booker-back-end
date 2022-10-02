const { trainingServices, booksServices } = require('../../services')
const { RequestError } = require('../../helpers')

const addTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    for (const book of body.books) {
        const originalBook = await booksServices.getById({ bookId: book._id, owner })
        if (!originalBook) {
            throw RequestError(400, 'No books found by ids.')
        } else {
            if (originalBook.status === 'haveRead' || originalBook.status === 'reading') {
                throw RequestError(400, 'Chosen books have already been read.')
            }
        }
    }
    const date = new Date()
    const dateUTC = date.setUTCHours(0, 0, 0, 0)
    if (Date.parse(body.startDate) + (3 * 36000 * 1000) < dateUTC) throw RequestError(400, 'Start Date may not precede today.')
    if (Date.parse(body.finishDate) - Date.parse(body.startDate) > (32 * 24 * 3600 * 1000) || Date.parse(body.finishDate) - Date.parse(body.startDate) < (24 * 3600 * 1000)) {
        throw RequestError(400, 'Training period should be greater than 1 day and must not exceed 31 days.')
    }
    const startTraining = async () => {
        body.books.forEach(async book => {
            await booksServices.updateBookStatus(book._id, owner, { status: 'reading' })
        })
        await trainingServices.addTraining(owner, body)
        res.status(201).json(await trainingServices.getTraining(owner))
    }
    const currentTraining = await trainingServices.getTraining(owner)
    if (currentTraining) {
        const { finishDate, completed, books: oldBooks, _id } = currentTraining
        if (completed) {
            await trainingServices.deleteTraining(_id)
            startTraining()
        }
        const currentDate = new Date()
        if (new Date(finishDate).getTime() >= currentDate.getTime()) {
            const difference = new Date(finishDate).getTime() - currentDate.getTime()
            const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
            throw RequestError(403, `Training is in progress. Try again in ${totalDays} days.`)
        } else {
            oldBooks.forEach(async book => {
                if (book.status !== 'haveRead') {
                    await booksServices.updateBookStatus(book._id, owner, { status: 'toRead' })
                }                
            })
            await trainingServices.deleteTraining(_id)
        }
    }
    startTraining()
}

module.exports = addTraining