let Joi = require('joi')
const validateData = Joi.object({
    title:Joi.string().min(2).max(20),
    description:Joi.string() 
}).and('title','description')

module.exports = validateData;