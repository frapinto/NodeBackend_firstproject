const express = require('express');

const{queen} = require('../datos/albumenes').albumenes;

const routerQueen = express.Router();

//middleware

routerQueen.use(express.json());

routerQueen.get('/', (req,res) => {
    res.send(JSON.stringify(queen))
});

routerQueen.get('/:genero', (req, res) => {
    const genero = req.params.genero;
    const resultados = queen.filter(queen => queen.genero === genero)

    if(resultados.length === 0){
        res.status(404).send(`No se encontraron resultados para ${genero}`)
    }

    if(req.query.ordenar === 'ventas'){
        res.send(JSON.stringify(resultados.sort((a,b) => b.ventas - a.ventas)));
    } else {
        res.send(JSON.stringify(resultados));
    }

    if(req.query.ordenar === 'canciones'){
        res.send(JSON.stringify(resultados.sort((a,b) => b.canciones - a.canciones)));
    } else {
        res.send(JSON.stringify(resultados));
    }

    res.send(JSON.stringify(resultados));
})

routerQueen.get('/:genero/:recepcion', (req,res) => {
    const genero = req.params.genero;
    const recepcion = req.params.recepcion;
    const resultados = queen.filter(queen => queen.genero === genero && queen.recepcion === recepcion)

    if(resultados.length === 0){
        res.send(`No se encontraron resultados para ${genero} de la categoria ${recepcion}`)
    } else {
        res.send(JSON.stringify(resultados));
    }

    res.send(JSON.stringify(resultados));
})

module.exports = routerQueen;