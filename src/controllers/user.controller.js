const bcrypt = require('bcrypt')

class UserController {
    constructor(userService){
        this.userService = userService;
    }

    async registerUser(req,res){
        try {
            const payload = req.body;
            this.userService.create_user(payload)
            return res.status(201).json({
                "status": "success",
                "message": "user registered successfully"
            })
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })
        }
    }

    async loginUser(req,res){
        try {
            const payload = req.body
            const user = await this.userService.get_user_by_email(payload.email)

            const is_match = bcrypt.compareSync(payload.password,user.password)
            if (is_match) {
                return res.status(200).json({
                    "status": "success",
                    "message": "Logged in successfully"
                })
            }

            res.status(400).json({
                "status": "failed",
                "error": "incorrect password"
            })

        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })            
        }
    }


}

module.exports = UserController;