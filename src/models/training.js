const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')
const { handleSchemaValidationErrors } = require('../helpers')

const trainingSchema = new Schema({
    startDate: {
        type: Date,
        required: [true, 'Set start date for new training'],
    },
    finishDate: {
        type: Date,
        required: [true, 'Set finish date for new training'],
    },
    books: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'book',
            index: true,
        }
    ],
    results: [
        {
            date: {
                type: Date,
                required: [true, 'Set date for added read pages'],
                default: Date.now,
                unique: true,
            },
            pages: {
                type: Number,
                required: [true, 'Set number of pages read for specified time'],
            }
        },                
    ],
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
}, { versionKey: false, timestamps: true })

trainingSchema.post('save', handleSchemaValidationErrors)

const Training = model('Training', trainingSchema)

const schemaAddTraining = Joi.object({
    startDate: Joi.date()
        .label('Training Start Date')
        .required(),

    finishDate: Joi.date()
        .label('Training Finish Date')
        .required(),
    
    books: Joi.array()
        .label('Books Array')
        .required(),
})

const schemaUpdateTraining = Joi.object({
    date: Joi.date()
        .label('Reading date')
        .required(),

    pages: Joi.number()
        .label('Number of pages read')
        .required(),
})

const trainingSchemas = { schemaAddTraining, schemaUpdateTraining }

module.exports = {
    Training,
    trainingSchemas
}