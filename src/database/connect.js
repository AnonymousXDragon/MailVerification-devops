const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    logging: console.log,
    define:{
        freezeTableName: true
    }
})


module.exports = {
    ConnectDb:async()=> {
        try {
            await sequelize.authenticate()
            console.log("connection to database was successfull")
            await sequelize.sync({ alter: true , force: true })
        } catch (error) {
            console.log(error)
        }
    }
}
