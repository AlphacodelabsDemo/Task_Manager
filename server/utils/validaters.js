const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userValidate = (data) => {
	const schema = Joi.object({
    firstName: Joi.string().required().label("first-name"),
		lastName: Joi.string().required().label("last-name"),
		email: Joi.string().email().required().label("email"),
		password: passwordComplexity().required().label("password"),
        
	});
	return schema.validate(data);
};


const authValidate = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label("email"),
      password: Joi.string().required().label("password"),
    });
    return schema.validate(data);
  };


  const taskValidate = (data) => {
    const schema = Joi.object({
      user: Joi.string().required(),
      description: Joi.string().required(),
      dueDate: Joi.date().required(),
      completed: Joi.boolean()
    });
  
    return schema.validate(data);
  };

module.exports = {userValidate , authValidate ,taskValidate};