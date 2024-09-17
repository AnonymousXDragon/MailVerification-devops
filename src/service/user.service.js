const bcrypt = require('bcrypt')

class UserService {

    constructor(userSession){
        this.userSession = userSession
    }


    async create_user(payload){
        try {
            payload.password = bcrypt.hashSync(payload.password,10)
            const user = await this.userSession.create(payload)
            return user
        } catch (error) {
            throw error
        }
    }

    async get_user(userId){
        try {
            const user = await this.userSession.findOne({ where: {
                id: userId
            }})

            if ( user === null || user === undefined ) {
                throw new Error("user not found")
            }

            return user
        } catch (error) {
            throw error
        }
    }

    async get_user_by_email(email) {
        try {
            const user = await this.userSession.findOne({ where: {
                email: email
            }})

            if ( user === null || user === undefined ) {
                throw new Error("user not found")
            }

            return user
        } catch (error) {
            throw error
        }
    }

    async update_user(userId,payload) {
        try {
            const user = await this.get_user(userId)
            if ( user === null || user === undefined ) {
                throw new Error("user not found")
            }

            const new_user = await this.userSession.update()
            await new_user.save()

            return new_user
        } catch (error) {
            throw error
        }
    }

    async delete_user(userId) {
        try {
            const user = await this.get_user(userId)
            if ( user === null || user === undefined ) {
                throw new Error("user not found")
            }
            
            await user.destroy()
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserService;