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

routerQueen.post('/', (req,res) => {
    let albumNuevo = req.body;
    queen.push(albumNuevo);
    res.send(JSON.stringify(queen)); 
} );

routerQueen.put('/:id', (req,res) => {
    let albumCambiado = req.body;
    const id = req.params.id;

    const indice = queen.findIndex(queen => queen.id == id);

    if(indice >= 0){
        queen[indice] = albumCambiado;
    } else {
        res.status(404).send(`No se pudo encontrar el indice ${indice}`)
    }

    res.send(JSON.stringify(queen));
})

routerQueen.patch('/:id', (req,res) => {
    const albumPatcheado = req.body;
    const id = req.params.id; 

    const indice = queen.findIndex(queen => queen.id == id);

    if (indice >= 0) {
       const albumAPatchear = queen[indice]
       Object.assign(albumAPatchear,albumPatcheado);
    }

    res.send(JSON.stringify(queen))
})

routerQueen.delete('/:id', (req,res) => {
    const id = req.params.id;

    const indice = queen.findIndex(queen => queen.id == id);

    if(indice >= 0) {
        queen.splice(indice,1);
    }

    res.send(JSON.stringify(queen));
})


module.exports = routerQueen;