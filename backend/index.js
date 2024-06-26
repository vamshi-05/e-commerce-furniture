const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')

//Environmental variables
require('dotenv').config()
const port=process.env.PORT

//Routes
const userRoutes=require('./routes/user.route')
const productRoutes=require('./routes/product.route')
const orderRoutes=require('./routes/order.route')
const cartRoutes=require('./routes/cart.route')
const loginRoutes=require('./routes/login.route')
const homeRoutes=require('./routes/home.route')
const {verifyToken,isAdmin}=require('./middleware/authorization')

//mongDB connection
const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/furniture")
.then((res)=>{console.log("connected successfully")})
.catch((err)=>{console.log(err)})


app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Routes
app.use('/order',verifyToken,orderRoutes)
app.use('/signup',userRoutes)
app.use('/home',homeRoutes)
app.use('/cart',cartRoutes)
app.use('/login',loginRoutes)
app.use('/admin',verifyToken,isAdmin,productRoutes)
app.get('/',(req,res)=>{
    res.status(200).send("Home page")
})

//server connection
app.listen(port,()=>{console.log(`server is listening at port ${port}`)})