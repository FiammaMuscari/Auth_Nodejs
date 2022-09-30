import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import "./auth/local.js"

import v1Routes from './v1/routes/index.js'

const app = express()
dotenv.config()

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: "secretito",
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())


app.use("/", v1Routes)



mongoose.connect(process.env.MONGO_KEY, {useNewUrlParser:true})
    .then(()=> console.log("Conectado a la base de datos"))
    .catch(err => console.log("Hubo un error!"))

app.listen(3000,() =>{
    console.log('Server is running in port 3000')
})