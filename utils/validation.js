const Joi = require('@hapi/joi');

const extractErrors = (error) => {
  const errors = error.details.reduce((prev, current) => {
    if (prev[current.path[0]]) {
      prev[current.path[0]].push(current.type)
    } else {
      prev[current.path[0]] = [current.type]
    }
    return prev
  }, {})
  return {
    errors,
    fields: Object.keys(errors)
  }
}

const ValidationError = (message, errors) => ({
  message, errors
})

const validate = (obj, schema) => {
  const { error, value } = Joi.validate(obj, schema, { abortEarly: false, stripUnknown: true })
  if (error) {
    throw ValidationError('validation', extractErrors(error))
  } else {
    return value
  }
}

module.exports = {
  extractErrors, validate, ValidationError
}