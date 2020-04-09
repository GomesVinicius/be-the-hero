const express = require('express')

const ongController = require('./controller/OngController')
const incidentController = require('./controller/IncidentController')
const profileController = require('./controller/ProfileController')
const sessionController = require('./controller/SessionController')
const { celebrate, Joi, Segments } = require ('celebrate') 

const routes = express.Router()


routes.get('/ongs', ongController.index)

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        wpp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),ongController.create)

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().length(8)
    })
}), sessionController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}),profileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),incidentController.index)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),incidentController.delete)

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}),incidentController.create)


module.exports = routes