const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000;
//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather",name:"Joe"})
}) 

app.get('/about',(req,res)=>{
    res.render('about',{title:"About Page",name:"Joe"})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:"Help Page",name:"Joe"})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address provided"
        })
    }
    geoCode(req.query.address,(error,{latitude,longtitude,location} = {})=>{
        if(error){
          return res.send({error}) // to stop the callback function if error occur (which can be used with if statement)
        }
      
        forecast(latitude,longtitude,(error,{temperature, precipProbability,summary} = {})=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                forecast: summary,
                location,
                address: req.query.address,
                temperature,
                precipProbability

            })
            // console.log(location)
            // console.log(temperature)
            // console.log(precipProbability)
            // console.log(summary)
        });
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{error:"Help article not found",title:"404",name:"Joe"})
})

app.get('*',(req,res)=>{
    res.render('404',{error:"Page not found",title:"404",name:"Joe"})
})


//start the server up
app.listen(port,()=>{
    console.log('Server is up on port: '+ port + '.')
})