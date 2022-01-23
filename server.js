require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require('./database.config');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

mongoose.connect(dbConfig.url, {

    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(express.json())
app.use(cors())

app.use("/api/calendar", require("./Controllers/CalendarController"));
app.use("/api/users", require('../server/routes/userRouter'));





app.listen(5000, () => console.log("server started"));