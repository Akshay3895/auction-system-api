var express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
const AuctionRouter = require('./routes/auction')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended : true,
    })
);

app.get('/', (req,res) => {
    res.json({"message": "ok"});
})

app.use('/auctionsystem',AuctionRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.log(err.message,err.stack);
    res.status(statusCode).json({'message':err.message});

    return;
})

app.listen(port, () =>{
    console.log(`Auction system listening at http://localhost:${port}`)
})