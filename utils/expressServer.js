const  express = require('express')
const http = require('http')
const { sequelize } = require('../utils/sequelize')
const { models } = sequelize
const jwt = require('jsonwebtoken')
const app = express()
const httpServer = http.createServer(app)

app.use('/verify/:signature', express.raw({type: 'application/json'}), async (req, res) => { 
    const { signature } = req.params
    const driver = jwt.decode(signature)
    await models.Drivers.update({verified: true}, { 
        where: { 
            email: driver.email
        }
    })
    // TODO write SQL query to update users account with verified true
    console.log(signature)
    res.redirect("http://localhost:3000/signup")
})

module.exports = { 
    app, 
    httpServer
}