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
            },
            pages: {
                type: Number,
                required: [true, 'Set number of pages read for specified time'],
            }
        },                
    ],
    completed: {
        type: Boolean,
        required: [true, 'Set completed status'],
        default: false
    },
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
        .iso()
        .min('now')
        .required(),

    finishDate: Joi.date()
        .label('Training Finish Date')
        .iso()
        .min(Joi.ref('startDate'))
        .required(),
    
    books: Joi.array()
        .label('Books Array')
        .min(1)
        .items(Joi.object({ _id: Joi.string().required() }))
        .required(),
})

const schemaUpdateTraining = Joi.object({
    date: Joi.date()
        .label('Reading date')
        .iso()
        .max('now')
        .required(),

    pages: Joi.number()
        .label('Number of pages read')
        .integer()
        .positive()
        .min(1)
        .max(999)
        .required(),
})

const trainingSchemas = { schemaAddTraining, schemaUpdateTraining }

module.exports = {
    Training,
    trainingSchemas
}