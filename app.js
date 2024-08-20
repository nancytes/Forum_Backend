const express = require('express');
const app = express();

const cors = require('cors')
require("dotenv").config()
app.use(cors())

//db connection
const dbConnection = require('./db/dbconfig');

//user routes middleware file
const userRoutes = require('./routes/userRoute');
const questionRoute = require('./routes/questionRoute');
const answerRoute = require('./routes/answerRoute');
const installRoute = require('./routes/installRoute')
const authMiddleware = require('./middleware/authMiddleware');

//json middleware to extract to json data
app.use(express.json());

app.use('/', installRoute)

//user routes middleware
app.use("/api/users", userRoutes);
//question route middleware
app.use("/api/questions", questionRoute)
//answer route middleware
app.use("/api/answers", answerRoute)

// const port = 3333;
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
    res.status(404).json({ msg: 'Resource not found error.' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something went wrong.', error: err.message });
});
async function start(){
    try {
        const result = await dbConnection.execute("select 'test'")
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening on ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}
start()
