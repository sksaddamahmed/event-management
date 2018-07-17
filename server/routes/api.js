const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const db = 'mongodb://sksaddamahmed:saddam1234@ds117681.mlab.com:17681/eventsdb-sksaddam'
mongoose.connect(db, err => {
    if(err){
        console.error('Error : ' + err)
    } else {
        console.log('Connected to mongoDb')
    }
})

// Routes
router.get('/',(req,resp) => {
    resp.send('From API Route')
})

// User Registration API
router.post('/register', (req,resp) => {
    let userdata = req.body
    let user = new User(userdata)
    user.save((error,registeredUser) => {
        if(error){
            console.log(error)
        } else {
            let payload = {subject : registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            resp.status(200).send({token})
        }
    })
})

// User Login API

router.post('/login',(req,resp) => {
    let userData = req.body

    User.findOne({email : userData.email},(error,user) => {
        if(error){
            console.error(error)
        } else {
            if(!user){
                resp.status(401).send('Invalid Email')
            } else if(user.password !== userData.password){
                resp.status(401).send('Invalid Password')
            } else {
                let payload = {subject : user._id}
                let token = jwt.sign(payload,'secretKey')
                let loggedInUser = new User(user)
                loggedInUser.password = null

                resp.status(200).send({token,loggedInUser})
            }

        }
    })

})

function verifyToken(req,resp,next){
    if(!req.headers.authorization){
        resp.status(401).send('UnAuthorized Request')
    }
    console.log(req.headers.authorization)
    let token = req.headers.authorization.split(' ')[1]
    console.log("token - " +token)
    if(token === null){
        resp.status(401).send('Null Token (UnAuthorized Request)');
    }

    let payload = jwt.verify(token,'secretKey');

    if(!payload){
        resp.status(401).send('UnAuthorized Request (Token Verification Failed)');
    }

    req.userid = payload.subject;
    next()
}

// Events API
router.get('/events',(req,resp) => {
    let events = [{
        "_id" : "1",
        "name" : "Auto Expo",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "2",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "3",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "4",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "5",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    }]
    resp.json(events)
})

router.get('/special',verifyToken,(req,resp) => {
    let events = [{
        "_id" : "1",
        "name" : "Auto Expo",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "2",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "3",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "4",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    },{
        "_id" : "5",
        "name" : "Auto Expo 1",
        "description" : "loreum ipsum",
        "date" : "2018-09-11T22:55:59.511Z"
    }]
    resp.json(events)
})

module.exports = router