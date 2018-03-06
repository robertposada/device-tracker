var express = require('express');
var jwt = require("jsonwebtoken");

module.exports = (dbs) => {
    var router = express.Router();
    var locationsDB = dbs.DeviceServer.db('DeviceServer'); // using the DeviceServer database

    /* If either username or password is missing or if they don't match to our record, 
     * return an HTML page with the username and password form fields. 
     * If they match, set an authentication session cookie in JSON Web Token (JWT), and redirect to redirect.
     */
    router.get('/:uuid?/:redirect?', (req, res) => {
        const uuid = req.query.uuid;
        var redirect = req.query.redirect;
        if (redirect == undefined) {redirect = '/listing/'};

        if (uuid == undefined) {
            // send user to login page to try again
            res.render("login", {message: ""});
        } else {
            // check authentication with database
            let query = {uuid: uuid};
            locationsDB.collection('Users').findOne(query, (err, result) => {
                if (err) {
                    res.status(500).end("Error in server");
                }
                if (result) {
                    // set a cookie to remember the users raspberry pi uuid
                    let hdr = {
                                "alg": "HS256",
                                "typ": "JWT"
                    };
                    let options = {header: hdr};
                    let secret = "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c";
                    let expiration = Math.floor(Date.now() / 1000) + (2 * 60 * 60); // 2 hours from now
                    let payload = {
                        "exp": expiration,
                        "uuid": uuid
                    };

                    const signedToken = jwt.sign(payload, secret, options);
                    res.cookie('jwt',signedToken, { httpOnly: false });
                    var encodeUUID = encodeURIComponent(uuid);
                    req.uuid = uuid;
                    res.redirect(redirect);
                }
                else {
                    // uuid doesnt exists in db - try again
                    res.render("login", {message: "That UUID isn't in our database :("});
                }
            });
        }
    });


    return router;
}