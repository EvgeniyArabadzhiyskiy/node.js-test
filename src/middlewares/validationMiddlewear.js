const Joi = require("joi");

const schema = Joi.object({
  topics: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(3).max(30).required(),
});

const addPostValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // return res.status(400).json({ message: error.message });
    error.status = 400;
    throw error;
  }

  next();
};

const putPostValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // return res.status(400).json({ message: error.message });
    error.status = 400;
    throw error;
  }

  next();
};

module.exports = {
  addPostValidation,
  putPostValidation,
};
