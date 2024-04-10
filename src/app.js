const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;



const staticPath  = path.join(__dirname,"..");
const templatePath=path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set ('views',templatePath);
hbs.registerPartials(partialsPath);




app.use(express.static(staticPath));

app.get('/',(req,res)=>
{
    res.render("index.hbs");
})
app.get('/about',(req,res)=>
{
    res.render("about");
})
app.get('/weather',(req,res)=>
{
    res.render("weather");
})
app.get('*',(req,res)=>
{
  res.render("error",
  {errormsg:" Oops!! Page not found"
  })
  
})

app.listen(port,()=>
{
    console.log(`listening on port${port}`);
})