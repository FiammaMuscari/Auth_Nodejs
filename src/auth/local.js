import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/users.js"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-register', new LocalStrategy({
    
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

    }, 
    async (req, username, password, done) => {

        const thereIsUser = await User.findOne({ username: username })

        if (thereIsUser) {
            return done(null, false, req.flash('registerMessage', 'Username already exists'))
        } else {
            const newUser = new User()
            newUser.username = username
            newUser.password = newUser.generateHash(password)
            await newUser.save()
            done(null, newUser)
        }        
}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username })
    if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found'))
    }
    if (!user.validatePassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password'))
    }
    done(null, user)
}))


export default passport