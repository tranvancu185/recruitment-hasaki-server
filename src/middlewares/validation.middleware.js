const { validationResult } = require('express-validator');
const rulesValidation = require('@src/validations/rules.validation');

const validateMiddleware = (validationText) => {
  const validationFunction = rulesValidation[validationText];
  
  if (!validationFunction) {
    throw new Error(`Invalid validationText: ${validationText}`);
  }

  return async (req, res, next) => {
    const validations = validationFunction(req);
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

module.exports = {
  validateMiddleware
};
