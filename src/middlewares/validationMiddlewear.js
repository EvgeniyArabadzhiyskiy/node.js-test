const Joi = require("joi");

const addPostValidation = (req, res, next) => {
  const schema = Joi.object({
    topics: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const putPostValidation = (req, res, next) => {
  const schema = Joi.object({
    topics: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  addPostValidation,
  putPostValidation,
};
