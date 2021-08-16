const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const addressRouter = require('./routes/address-router')
const apiPort = 3000
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

app.get('/', (req, res) => {
    res.send('Node server running just fine!')
})

app.use('/api', addressRouter)

const server = app.listen(apiPort, () => {
    console.log('Server running on the port ' + apiPort)
})
