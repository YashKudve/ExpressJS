const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    // console.log('Hello');
    // res.send("hey there");

    // res.sendStatus(500)
    // res.status(500).send("Some error occured")
    // res.status(500).json({message: 'Error occured', key:'123'})

    res.render('index')

})

app.listen(3000)