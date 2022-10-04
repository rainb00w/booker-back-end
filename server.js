const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT, () => {
        console.log(`Database connection successful on port ${MAIN_PORT}`)
    })
    )
    .catch(err => {
        console.error(err)
        process.exit(1)
    });



    // mongoose.connect(DB_HOST)
    // .then(() => app.listen(MAIN_PORT, () => {
    //     console.log(`Database connection successful on port ${MAIN_PORT}`)
    // })
    // )
    // .catch(err => {
    //     console.error(err)
    //     process.exit(1)
    // });
