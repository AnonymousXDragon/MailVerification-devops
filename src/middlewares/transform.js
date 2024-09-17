

const transformDto = (schema) => async (req,res,next) => {
    try {
        await schema.validate(req.body)
        next()
    } catch (error) {
        return res.status(400).json({
            "status": "failed",
            "error": error.message
        })
    }
}


module.exports = {
    transformDto,
}