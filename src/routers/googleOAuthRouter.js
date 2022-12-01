const queryString = require('query-string');
const axios = require('axios');
require("dotenv").config();

const express = require("express");
const controllerWrapper = require("../middlewares/controllerWrapper");
const router = express.Router();
// const { Google } = require("../db/googleModel");
const { User } = require('../db/userModel');

const {BASE_URL} = process.env
const {FRONTEND_URL} = process.env
const {GOOGLE_CLIENT_ID} = process.env
const {GOOGLE_CLIENT_SECRET} = process.env


const googleAuth = async (req, res) => {
    const stringifiedParams = queryString.stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth-google/google-redirect`,
        scope:[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(" "),
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent',
        
    })
    
    return res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
    )
}

const googleRedirect = async (req, res) => {
   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

   const urlOdject = new URL(fullUrl);
   const urlParams = queryString.parse(urlOdject.search);
   const code = urlParams.code;

   const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'POST',
    data: {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/auth-google/google-redirect`,
        grant_type: 'authorization_code',
        code: code,
    }
   });
//    console.log("googleRedirect  tokenData", tokenData.data.access_token);

   const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'GET',
    headers: {
       'Authorization': `Bearer ${tokenData.data.access_token}`
    }
   })
    // console.log("googleRedirect  userData", userData.data);

    const email = userData.data.email
    console.log("googleRedirect  userData", userData.data.email);

    const user = await User.find({email});
    console.log("googleRedirect  user", user);
    
   
    return res.redirect(
        `${FRONTEND_URL}?accessToken=${tokenData.data.access_token}`
    )
}


router.get("/google", controllerWrapper(googleAuth));
router.get("/google-redirect", controllerWrapper(googleRedirect));



// router.get("/", controllerWrapper(async (req, res) => {
//     const  users = await Google.find({})
   
//     res.json({ users, status: "success" });
// }));

// router.post("/", controllerWrapper(async (req, res) => {
//     const { body } = req;
//     const user = new Google({ ...body });
//     const newUser = await user.save();
   
//     res.status(201).json({ newUser, status: "success" });
// }));


module.exports = { googleRouter: router };  