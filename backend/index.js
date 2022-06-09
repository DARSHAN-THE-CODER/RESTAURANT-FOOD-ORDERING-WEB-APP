import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import  mongoose from "mongoose";

var app=express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));

app.use(bodyParser.json())
app.use(cors())
var PROCESS=dotenv.config()

//CONNECTING TO MONGO-DB
mongoose.connect(process.env.MONGOURI);
var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})


const itemSchema=new mongoose.Schema({
    id:Number,
    type:String,
    name:String,
    description:String,
    photoUrl:String,
    price:Number,
    time:Number,
    ingredients:String,
})

const restSchema=new mongoose.Schema({
    orders:[],
    orderId:Number,
    isCompleted:Boolean
})

const Item=new mongoose.model("Item",itemSchema)
const Order=new mongoose.model("order",restSchema)


app.get('/vegList',(req,res)=>{
    Item.find({type:'veg'},function(err,items){
        if(err){
            console.log(err)
        }
        // console.log(items)
        res.json(items)
    })
})

app.get('/nonvegList',(req,res)=>{
    Item.find({type:'non-veg'},function(err,items){
        if(err){
            console.log(err)
        }
        // console.log(items)
        res.json(items)
    })
})

app.post('/confirm',(req,res)=>{
    
    const orders=req.body
    const orderId=Date.now()
    const isCompleted=false
    const o=new Order({orders,orderId,isCompleted})
    // console.log("heyy-------------------------------" ,o)
    o.save(err=>{
        if(err)
        {
            console.log(err)
            res.send({message:"Failed to place order",status:500})
        }
        else{
            res.send({message:"Order placed successfully",id:orderId,status:400})
        }
    })
})

app.patch("/login/:uname/:pword",(req,res)=>{
    // console.log(uname)
    console.log(req.params.uname)
    if(req.params.uname=='testing' && req.params.pword=='1234')
    {
        console.log("success")
        res.json({message:"SUCCESS",status:400})
    }
    else res.json({message:"Username and password doesnt match",status:500})
})

app.get("/orders",(req,res)=>{
    Order.find({isCompleted:false},(err,orders)=>{
        if(err)
        {
            res.json({message:"unable to fetch order list",status:500})
        }
        else{
            console.log(orders)
            res.json(orders)
        }
    })
})

app.get("/order/:id",(req,res)=>{
    console.log(req.params.id)
    Order.find({orderId:req.params.id},(err,order)=>{
        if(err)
        {
            res.json({message:"unable to fetch order",status:500})
        }
        else{
            res.json(order)
        }
    })
})

app.patch("/update/:id",(req,res)=>{
    console.log(req.params.id)
    Order.findOneAndUpdate({orderId:req.params.id},{isCompleted:true})
    .then(
        res.send({status:400})
    )
})

app.listen(8080,() =>{
    console.log('server file is running')
});



