let express = require('express')
let logger =require('./logger')
let cors = require('cors')
let jwt = require("jsonwebtoken")
let schema = require("./graphql/graphqlSchema")
const GraphqlHTTP = require('express-graphql')

// let whiteList = ['http://192.168.43.137:3000', "http://localhost:3000"]

let app = express()

// let corsFactor = ()=>{
    
// }
// let corsOptions = {
//     origin: true,
//     credentials: true, 
//   }




app.disable("etag").disable("x-powered-by")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
Port = process.env.PORT || 5000

if(process.env.NODE_ENV == "production"){
    app.use(express.static("./sms-ui/build"))
}

// let corsFactors = (req, callback)=>{
   
//     let corsOptions
//     if(whiteList.indexOf(req.header("Origin")) != -1){
//         corsOptions = {
//             origin:true,
//             credentials: true, 
//           }
//     }
//     else{
//         corsOptions = {
//             origin:false,
//             credentials: false, 
//           }
//     }
//     callback(null, corsOptions)
    
// }

// let logheader = (req, res, next)=>{
//     console.log(req.headers)
//     console.log("origin::",req.headers.authorization)
//     // console.log("authorization::",req.headers.authorization)
//     console.log(req.method)
//     res.setHeader('clear-Site-Data','"cookies"')
//     res.cookie(
//         "john","landry",
//         {
//             maxAge:2000,
//             expires:new Date(Date.now()+2000),
//             // signed:true,
//             path:'/',
//             // httpOnly:true,
//             sameSite:"strict",
//         })
//         // res.sendStatus(100)
//     next()
// }

// app.use("/g",cors(corsFactors), logger, logheader, GraphqlHTTP({
    app.use("/g",cors(), GraphqlHTTP({
    schema,
    graphiql:true,
    pretty:true,
    customFormatErrorFn:(error)=>{
        console.log("server error message::",error.message)
        console.log("Error Location::",error.locations)
        console.log("Error Name::",error.name)
        console.log("Error node::",error.nodes)
        console.log("error origin::",error.originalError)
        console.log("error source",error.source.body)
        console.log("error path::",error.path)

    },
}))

app.listen(Port,() => {
    console.log(`you are connected on Port:${Port}`)
}) 