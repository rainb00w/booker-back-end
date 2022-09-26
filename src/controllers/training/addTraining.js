const { trainingServices, booksServices } = require('../../services')
const { RequestError } = require('../../helpers')

const addTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    for (const book of body.books) {
        const originalBook = await booksServices.getById({ bookId: book._id, owner })
        if (originalBook.status === 'haveRead' || originalBook.status === 'reading') {
            throw RequestError(400, 'Chosen books have already been read.')
        }
    }
    const currentTraining = await trainingServices.getTraining(owner)
    if (currentTraining) {
        const { finishDate, _id } = currentTraining
        if (currentTraining.completed) {
            body.books.forEach(async book => {
                await booksServices.updateBookStatus(book._id, owner, { status: 'reading' })
            })
            await trainingServices.deleteTraining(_id)
            await trainingServices.addTraining(owner, body)
            res.status(201).json(await trainingServices.getTraining(owner))
        }
        const currentDate = new Date()
        if (finishDate.getTime() >= currentDate.getTime()) {
            const difference = finishDate.getTime() - currentDate.getTime()
            const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
            throw RequestError(403, `Training is in progress. Try again in ${totalDays} days.`)
        } else {
            await trainingServices.deleteTraining(_id)
        }
    } 
    body.books.forEach(async book => {
        await booksServices.updateBookStatus(book._id, owner, { status: 'reading' })
    })
    await trainingServices.addTraining(owner, body)
    res.status(201).json(await trainingServices.getTraining(owner))
}

module.exports = addTraining