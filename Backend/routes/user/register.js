var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

import Mongo from '../../utils/Mongo';

/* POST Register info */
router.post('/', function(req, res, next) {
    const newUser = req.body;
    const userQuery = {
        email: newUser.email
    };
    const matches = {
        email: newUser.email,
        likes: []
    };
    const calendar = {
        email: newUser.email,
        events: []
    };

    Mongo.find("Users", userQuery, undefined, (result) => {
        if (result.length === 0) {
            const resp = {
                success: true
            };

            /**
             * This will has the password with a salt of 10. 
             * @params newUser.password This is the password that the user will be set with. 
             */ 
            bcrypt.hash(newUser.password, 10, function(err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                Mongo.insert("Matches", matches, () => {});
                Mongo.insert("Calendars", calendar, () => {});
                Mongo.insert("Users", newUser, () => {
                    res.json(resp);
                });
            });
        } else {
            const resp = {
                success: false
            };

            res.json(resp);
        }
    });
});

router.get('/', function(req, res, next) {
    console.log(req)
});

module.exports = router;