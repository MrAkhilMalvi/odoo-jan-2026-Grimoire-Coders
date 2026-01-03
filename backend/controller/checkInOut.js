const dbClient = require('../db.js');
const {status} = require('http-status');

async function store_user_checkin(req,res,next){
    const {login_id} = req.body;
     try {
        const result = await dbClient.query("select * from store_user_check_in($1)", [login_id]);

        return res.send({success : true});
    } catch (error) {
       return res.status(status.INTERNAL_SERVER_ERROR).send({success : false, message : 'Your check in time is not store please call admin person.'})
    }
}

async function last_check_in(req,res,next){
    const {login_id} = req.body;
     try {
        const result = await dbClient.query("select * from last_user_check_in($1)", [login_id]);

        return res.send({success : true});
    } catch (error) {
       return res.status(status.INTERNAL_SERVER_ERROR).send({success : false, message : 'Your last check in time is not get please call admin person.'})
    }
}

async function store_user_checkout(req,res,next){
    const {login_id} = req.body;
     try {
        const result = await dbClient.query("select * from store_user_check_out($1)", [login_id]);

        return res.send({success : true});
    } catch (error) {
       return res.status(status.INTERNAL_SERVER_ERROR).send({success : false, message : 'Your check out time is not store please call admin person.'})
    }
}

module.exports = {
    store_user_checkin,
    last_check_in,
    store_user_checkout
}
