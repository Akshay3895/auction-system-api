const express = require('express')
const router = express.Router()
const auction = require('../services/auction')

router.get('/getmembers', async (req,res,next) => {

    try{
        res.json(await auction.getMembers());
    }
    catch (err){
        console.log("Error while getting the users : ", err.message);
        next(err);
    }

});

router.post('/memberdetails', async (req,res,next) => {

    try{
        res.json(await auction.memberDetails(req.body));
    }
    catch (err){
        console.log("Error while getting the details of member : ", err.message);
        next(err);
    }

});

router.post('/validatemember', async(req,res,next)=>{
    try{
        var result = await auction.validateMember(req.body)

        if (result.length > 0)
            res.sendStatus(200)
        res.sendStatus(401)
    }
    catch (err){
        console.log("Error while validating member ", err.message);
        next(err);
    }
})

router.get('/paintinglist', async (req,res,next) => {

    try{
        res.json(await auction.getPaintingList());
    }
    catch (err){
        console.log("Error while obtaining painting list: ", err.message);
        next(err);
    }

});

router.get('/hey', async (req,res,next)=>{
    res.json({"message":"ok"})
})

module.exports = router;