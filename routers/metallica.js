const express = require('express');

const{metallica} = require('../datos/albumenes').albumenes;

const routerMetallica = express.Router();

///middleware

routerMetallica.use(express.json());

routerMetallica.get('/', (req,res) => {
    res.send(JSON.stringify(acdc))
})

routerMetallica.get('/:genero', (req,res) => {
    const genero = req.params.genero;
    const resultados = albumenes.filter(metallica => metallica.genero === genero);

    if(resultados === 0){
        res.send(`No se encontraron resultados para ${genero}`)
    }

    if(req.query.ordenar = 'ventas') {
        res.send(JSON.stringify(resultados.sort((a,b) => b.ventas - a.ventas)));
    } else {
        res.send(JSON.stringify(resultados))
    }

    if(req.query.ordenar = 'canciones') {
        res.send(JSON.stringify(resultados.sort((a,b) => b.canciones - a.canciones)));
    } else {
        res.send(JSON.stringify(resultados))
    }

    res.send(JSON.stringify(resultados));
})

routerMetallica.get('/:genero/:recepcion', (req,res) => {
    const genero = req.params.genero;
    const recepcion = req.params.recepcion;

    const resultados = metallica.filter(metallica => metallica.genero === genero && metallica.recepcion === recepcion);

    if(resultados === 0) {
        res.send(`No se encontraron resultados para ${genero} de la categoria ${recepcion}`)
    } else {
        res.send(JSON.stringify(resultados))
    }

    res.send(JSON.stringify(resultados))
})

module.exports = routerMetallica;