const { error } = require('console');
const express = require('express');
const app = express() ;
const port = 3000 ;
const mongoose = require('mongoose');
var moment = require('moment');

var mo = require('method-override');
app.use(mo('_method'));

const client = require('./models/client');

app.use(express.urlencoded({extended : true}))

app.set('view engine' , 'ejs');
app.use(express.static('public'))


mongoose.connect('mongodb://127.0.0.1:27017/datauser').then(
    ()=>{
        app.listen(port , ()=>{
            console.log(`http://localhost:${port}`);
        })
    }
).catch(
    (error)=>{
        console.log(error)
    }
)

// get requests : 

app.get('/' , (req ,res)=>{
    client.find().then((result)=>{
        res.render('index' , {arr : result , moment : moment} )
    }).catch(
        (err)=>{
            console.log(err)
        }
    )
    // res.render('index'  )
});

app.get('/user/add.html' , (req ,res)=>{
    res.render('user/add');
});


app.get('/edit/:id' , (req ,res)=>{
    client.findById(req.params.id).then(
        (result)=>{
            res.render('user/edit' , {editeObj : result});
        }
    ).catch(
        (err)=>{
            console.log(err);
        }
    )
});

app.put('/edit/:id' , (req ,res)=>{
    client.updateOne({_id : req.params.id } , req.body)
    .then(
        ()=>{
            res.redirect('/');
        }
    ).catch((err)=>{
        console.log(err)
    })
});

app.delete('/delete/:id' , (req ,res)=>{
    client.deleteOne({_id : req.params.id })
    .then(
        ()=>{
            res.redirect('/');
        }
    ).catch((err)=>{
        console.log(err)
    })
});

app.get('/user/search.html' , (req ,res)=>{
    res.render('user/search');
});

app.get('/user/:id' , (req ,res)=>{
    client.findById(req.params.id)
    .then(
        (result)=>{
            res.render('user/view' , {obj : result , moment : moment });
        }
    ).catch((err)=>{
        console.log(err);
    })
    
});

// post data 

app.post('/user/add.html' , (req , res)=>{
    dataClient = req.body ;
    Newclient = new client(dataClient);
    
    Newclient.save().then(
        (saved)=>{
            res.redirect('/')
        }
    ).catch(
        (err)=>{
            console.log(err)
        }
    )
})