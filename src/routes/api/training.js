const express = require('express')
const router = express.Router()
const { trainingController } = require('../../controllers')
const { controllerWrapper } = require('../../helpers')
const { validationBody, authentificate } = require('../../middlewares')
const { trainingSchemas } = require('../../models')

router.get('/', authentificate, controllerWrapper(trainingController.getTraining))

router.post('/', authentificate, validationBody(trainingSchemas.schemaAddTraining), controllerWrapper(trainingController.addTraining))

router.patch('/', authentificate, validationBody(trainingSchemas.schemaUpdateTraining), controllerWrapper(trainingController.updateTraining))

module.exports = router
