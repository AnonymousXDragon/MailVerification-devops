const { object , string , } = require('yup')


const userRegisterSchema = object({
    name: string().required(),
    email: string().required(),
    password: string().required(),
})

const userLoginSchema = object({
    email: string().required(),
    password: string().required(),
})


module.exports = {
    userLoginSchema,
    userRegisterSchema
}