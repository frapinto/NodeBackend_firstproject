const express = require('express');

const app = express();

const {albumenes} = require('./datos/albumenes');

//Routers

const routerAcdc = require('./routers/acdc');
app.use('/api/albumenes/acdc',routerAcdc);

const routerMetallica = require('./routers/metallica');
app.use('/api/albumenes/Metallica',routerMetallica);

const routerQueen= require('./routers/queen');
app.use('/api/albumenes/queen',routerQueen);

//Routing

app.get('/', (req,res) =>{
    res.send('Mi primer servidor con Express. Albúmenes');
});

app.get('/api/albumenes', (req,res) => {
    res.send(JSON.stringify(albumenes));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto ${PORT}...`);
})