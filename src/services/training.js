const { Training } = require('../models')

const addTraining = async (owner, body) => {
    return await Training.create({ ...body, owner })
}

const deleteTraining = async (id) => {
    return await Training.findByIdAndDelete(id)
}

const getTraining = async (owner) => {
    return await Training.findOne({owner}).populate('books', ['pages', 'status'])
}

const updateTraining = async (id, body) => {
    return await Training.findOneAndUpdate({ _id: id }, body, { upsert: true, new: true }).populate('books', ['pages', 'status'])
}

const addResults = async (id, body) => {
    return await Training.findOneAndUpdate({ _id: id}, { $push: { results: { ...body } } }, { upsert: true, new: true }).populate('books', ['pages', 'status'])
}

module.exports = {
    addTraining,
    getTraining,
    updateTraining,
    deleteTraining,
    addResults
}
