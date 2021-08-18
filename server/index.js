const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const addressRouter = require('./routes/address-router')
const emailRouter = require('./routes/email-router')
const apiPort = 4000
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

app.get('/', (req, res) => {
    res.send('Node server running just fine!')
})

app.use('/api', addressRouter)
app.use('/api', emailRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const server = app.listen(apiPort, () => {
    console.log('Server running on the port ' + apiPort)
})
