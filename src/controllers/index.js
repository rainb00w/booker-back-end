const trainingController = require('./training')
const {registration, login} = require('./authControllers')

module.exports = {
    trainingController,
    registration,
    login
}