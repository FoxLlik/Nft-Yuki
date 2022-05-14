require("dotenv").config({ path: './config/.env' });

const express = require('express');
const cors = require("cors")

const db = require('./db');

const morganCustom = require("./middleware/morganCustom")
const errorHandler = require("./middleware/errorHandler")
const successFn = require("./middleware/successFn")

const app = express();
const port = process.env.PORT

// Бааз холбож байгаа нь
db.dbConntect()

// CORS-ын тохиргоо
var whitelist = [
    process.env.CLIENT_URL,
    process.env.CLIENT_LOCAL_URL
]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    allowedHeaders: "Authorization, Set-Cookie, Content-Type, Accept, SameSite",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morganCustom)
app.use(successFn)

// Routes
app.use("/api/v1/user", require("./routes/user"));

app.use(errorHandler)
app.use('/public', express.static('../backend/public/'));

app.listen(port, () => {
    console.log(`${port} deer ajillaj bn `)
})
