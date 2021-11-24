const db = require('./db')
const config = require('../config')
const helper = require('../helper')

async function getMembers(){
    const rows = await db.query(`SELECT * FROM member`);

    const data = helper.emptyOrNot(rows);

    return {data}
}

async function memberDetails(member){

    const rows = await db.query(`SELECT * FROM member where member_id= ?`,
    [member.id])

    var data = helper.emptyOrNot(rows)[0];

    return {data}
}

async function validateMember(usercredentials){

    // Returns only a single member's details
    
    const rows = await db.query(`SELECT * FROM member where email_id= ? AND password= ?`,
    [usercredentials.email,usercredentials.password])

    const data = helper.emptyOrNot(rows);

    return data
}

async function getPaintingList(){
    
    // Returns all the painitngs currently in auction with highest bid info

    const rows = await db.query(`select date_posted,end_date,title,description,width,length,
    initial_bid_price,increment,buyer_id,max(bid_price) as max_bid,fname as max_bid_by 
    from painting 
    left join (bids) on bids.painting_id=painting.painting_id 
    left join member on bids.buyer_id=member.member_id 
    where now()<=painting.end_date group by painting.painting_id;`)

    const data = helper.emptyOrNot(rows);

    return {data}
}



module.exports = {
    getMembers,
    validateMember,
    memberDetails,
    getPaintingList
}


