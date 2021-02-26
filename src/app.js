const path = require('path');
const express = require('express');
const hbs = require('hbs');
const viewsPath = path.join(__dirname,'./templates/views');
const partialsPath = path.join(__dirname,'./templates/partials')
const geoCode = require('./geocode')
const foreCast = require('./forecast')


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req,res) => {
    res.render('index',{
        title: 'weather',
        name: 'simone'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'about',
        name: 'simone'
    });
})


app.get('/help', (req,res) => {
    res.render('help',{
        title: 'help',
      msg: 'help page',
      name: 'simone'
    });
})

app.get('/api', (req,res) => {
    if(!req.query.address){
        res.send({
            error:' metti search'
        })
    }

    else{
        geoCode(req.query.address, (err,data = {}) => {
            if(err === null){
                res.send({
                    error: 'error',
                    errmsg: err
                });
            }
            else{
                foreCast(data.lat,data.long, (err,weather) => {
                    if(err){
                        res.send({
                            error: 'error',
                            errmsg: err
                        });
                    }
                    else{
                        res.send({
                            forecast: weather,
                            address: req.query.address
                        });
                    }
                });
            }  
        });
    }
});

app.get('/help/*', (req,res) => {
    res.send('404 help');
    })

app.get('*', (req,res) => {
res.send('404');
})



app.listen(port, () => {
    console.log('run at port' + port);
});