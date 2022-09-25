const { trainingServices, booksServices } = require('../../services')
const { RequestError } = require('../../helpers')

const updateTraining = async (req, res) => {
    const { _id: owner } = req.user
    const { body } = req
    const currentTraining = await trainingServices.getTraining(owner)
    if (currentTraining) {
        const { _id, results, books, completed } = currentTraining
        if (completed) throw RequestError(403, 'Training is completed!')
        const newResults = results.push(body)
        console.log(results, books, newResults)
        const totalBooksPages = books.reduce((previousValue, book) => previousValue + book.pages, 0)
        console.log(totalBooksPages)
        const totalPagesRead = results.reduce((previousValue, result) => previousValue + result.pages, 0)
        console.log(totalPagesRead)
        if (totalPagesRead + Number(body.pages) >= totalBooksPages) {
            for (const book of books) {
                const originalBook = await booksServices.getById({ bookId: book._id, owner })
                if (originalBook.status === 'toRead') {
                    await booksServices.updateBookStatus(originalBook._id, owner, { status: 'haveRead' })
                }
            }
            res.json(await trainingServices.updateTraining(_id, {date: body.date, results: newResults, completed: true}))    
        } 
        // res.json(await trainingServices.updateTraining(_id, {date: body.date, results: newResults}))
    } else throw RequestError(404, 'Not found')
}

module.exports = updateTraining