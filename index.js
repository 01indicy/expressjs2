const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const service = express()
const routes = require('./routes/routes')
require('dotenv').config()

service.use(morgan('dev'))
service.use(bodyParser.json())
service.use(bodyParser.urlencoded({ extended: false }));
service.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({ error: 'Invalid JSON Format' }); // Respond with a 400 Bad Request
    } else {
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a generic error for other types of errors
    }
});
service.use('/api',routes)
service.listen(process.env.PORT,() => console.log(`service is running on port ${process.env.PORT}`))