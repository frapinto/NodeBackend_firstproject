const express = require('express');

const{metallica} = require('../datos/albumenes').albumenes;

const routerMetallica = express.Router();

///middleware

routerMetallica.use(express.json());

routerMetallica.get('/', (req,res) => {
    res.send(JSON.stringify(metallica))
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

routerMetallica.post('/', (req,res) => {
    let albumNuevo = req.body;
    metallica.push(albumNuevo);
    res.send(JSON.stringify(metallica)); 
} );

routerMetallica.put('/:id', (req,res) => {
    let albumCambiado = req.body;
    const id = req.params.id;

    const indice = metallica.findIndex(metallica => metallica.id == id);

    if(indice >= 0){
        metallica[indice] = albumCambiado;
    } else {
        res.status(404).send(`No se pudo encontrar el indice ${indice}`)
    }

    res.send(JSON.stringify(metallica));
})

routerMetallica.patch('/:id', (req,res) => {
    const albumPatcheado = req.body;
    const id = req.params.id; 

    const indice = metallica.findIndex(metallica => metallica.id == id);

    if (indice >= 0) {
       const albumAPatchear = metallica[indice]
       Object.assign(albumAPatchear,albumPatcheado);
    }

    res.send(JSON.stringify(metallica))
})

routerMetallica.delete('/:id', (req,res) => {
    const id = req.params.id;

    const indice = metallica.findIndex(metallica => metallica.id == id);

    if(indice >= 0) {
        metallica.splice(indice,1);
    }

    res.send(JSON.stringify(metallica));
})


module.exports = routerMetallica;