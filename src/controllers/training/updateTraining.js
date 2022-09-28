const { trainingServices, booksServices } = require('../../services')
const { RequestError } = require('../../helpers')

const updateTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    const currentTraining = await trainingServices.getTraining(owner)
    if (currentTraining) {
        const { _id, results, books, completed, startDate, finishDate } = currentTraining
        if (completed) { throw RequestError(403, 'Training is completed!') }
        if (new Date(body.date).getTime() < new Date(startDate).getTime()) throw RequestError(400, 'Date may not precede training start date')
        if (new Date(body.date).getTime() > new Date(finishDate).getTime()) throw RequestError(400, 'Date is greater than training finish date')
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        if (new Date(body.date).getTime() < yesterday.getTime()) throw RequestError(400, 'Date should be today or yesterday')
        const totalBooksPagesCount = books.reduce((previousValue, book) => previousValue + book.pages, 0)
        const totalPagesReadCount = results.reduce((previousValue, result) => previousValue + result.pages, 0)
        const totalReadBooksPagesCount = books.reduce((previousValue, book) => {
            if (book.status === 'haveRead') {
                return previousValue + book.pages
            }
            return previousValue
        }, 0)
        if (totalBooksPagesCount - totalPagesReadCount < body.pages) throw RequestError(400, 'Provided pages count exceeds number of unread pages!')
        if (totalPagesReadCount + Number(body.pages) >= totalBooksPagesCount) {
            for (const book of books) {
                const originalBook = await booksServices.getById({ bookId: book._id, owner })
                if (originalBook.status !== 'haveRead') {
                    await booksServices.updateBookStatus(originalBook._id, owner, { status: 'haveRead' })
                }
            }
            res.json(await trainingServices.updateTraining(_id, { $push: { results: { ...body } }, completed: true }))
        } else {
            let pagesReadCount = totalPagesReadCount - totalReadBooksPagesCount + Number(body.pages)
            for (let i = 0; i < books.length; i += 1) {
                if (books[i].status === 'haveRead') continue
                if (pagesReadCount > books[i].pages) {
                    await booksServices.updateBookStatus(books[i]._id, owner, { status: 'haveRead' })
                    pagesReadCount -= books[i].pages
                }
            }
            res.json(await trainingServices.addResults(_id, body))
        }
    } else throw RequestError(404, 'Not found')
}

module.exports = updateTraining