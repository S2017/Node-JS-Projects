const path = require("path")
const express = require('express')
//required for loading partials
const hbs =  require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
//define paths for express config
//serving the static page
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

//using handlebars we render and not send
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather App',
        name: 'Sai Hari'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name: 'Sai Hari'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Sai Hari'
    })
})


// app.get('/', (req,res)=>{
//     //sending HTML
//     res.send('<h1>Serve the weather!</h1>')
// })

// app.get('/help', (req,res)=>{
//     //sending JSON
//     res.send([{
//         name: 'Sai',
//         age: 22
//     },{
//         name: 'Hari',
//         age: 32
//     }])
// })

// app.get('/about', (req,res)=>{

//     res.send('<title>About me</title>')
// })

app.get('/weather', (req,res)=>{
if(!req.query.address){
    return res.send({
        error: 'Address must be provided'
    })
} else {
    /*res.send({
        location:'Philadelphia',
        forecast: 'Its 30 degrees out there',
        address: req.query.address
    })*/
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
          //if there is an error, the message will be printed and the function stops there.
          return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        })
      })
    }
})


app.get('/products',(req, res) => {
    if(!req.query.search){
        //only once responds need to be sent so adding return so that program stops after sending the 
        //response. another send below is not executed so that the error is avoided.
        return res.send({
           error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Hari',
        message: 'Help article not found'
    })
})

//why its last? node keeps checking code from top to bottom to match the routes, when its found, it doesn't continue with other so its always good to use wildcard for 404 at last
app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Sai Hari',
        message: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is listening in port 3000')
})