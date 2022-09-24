const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

const { MAIN_PORT = 3001, DB_HOST } = process.env;

mongoose.connect(DB_HOST)
    .then(() => app.listen(MAIN_PORT, () => {
        console.log(`Database connection successful on port ${MAIN_PORT}`)
    })
    )
    .catch(err => {
        console.error(err)
        process.exit(1)
    });

