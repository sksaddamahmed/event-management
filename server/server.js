const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
// Use the route file api.js
const api = require('./routes/api')
const app = express()

app.use(cors())
app.use(bodyParser.json())
// User the API
app.use('/api',api)


app.get('/',function (req,resp) {
    resp.send('Hello from the server')
})

app.listen(PORT,function () {
    console.log('Express server is running on http://localhost:'+PORT)
})