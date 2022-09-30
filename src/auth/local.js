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

        const thereIsUser = await User.findOne({username: username})

        if(thereIsUser){
            return done(null, false, {message:"Username is already taken."})
        } else {
            const newUser = new User()
            newUser.username = username
            newUser.password = newUser.generateHash(password)
            await newUser.save()
            done(null, newUser)
        }


        
    }
))


export default passport