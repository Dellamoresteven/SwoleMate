var express = require('express');
var router = express.Router();

import Mongo from '../../utils/Mongo';

/* GET Conversation */
router.get('/', function(req, res, next) {
    const email1 = req.header("email1");
    const email2 = req.header("email2");

    Mongo.getConversation(email1, email2, (conversation) => {
        res.json(conversation);
    });
});

/* POST new message */
router.post('/', function(req, res, next) {
    const email1 = req.body.sender;
    const email2 = req.body.re;
    const msg = req.body.msg;
    const mm = {
        success: true
    };

    Mongo.setConversation(email1, email2, msg, () => {
        // console.log("Got here39");
        res.json(mm);
    });
});

module.exports = router;
