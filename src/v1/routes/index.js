import express from "express"
import passport from "passport"

const router = express.Router()

router
    .get("/auth/login", (req, res, next) => {
        res.send("Login page")
    })
    .post("/auth/login", passport.authenticate("local-login", {
        successRedirect: "/profile",
        failureRedirect: "/auth/login",
        failureFlash: true
    }))

    .get("/auth/register", (req, res, next) => {
            res.send("Register page")
    })
    .post("/auth/register", passport.authenticate("local-register", {
        successRedirect: "/profile",
        failureRedirect: "/auth/register",
        passReqToCallback: true
    }))

    .get("/auth/logout", (req, res, next) => {
        req.logout()
        res.redirect("/auth/login")
    })

router.use((req, res, next) => {
    isLoggedIn(req, res, next)
    next()
})

router
    .get("/profile", (req, res, next) => {
        res.send("Profile page")
    })

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect("/auth/login")
    }

export default router