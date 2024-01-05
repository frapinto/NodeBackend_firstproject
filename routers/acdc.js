const express = require('express');

const{acdc} = require('../datos/albumenes').albumenes;

const routerAcdc = express.Router();

//middleware

routerAcdc.use(express.json());

routerAcdc.get('/', (req,res) => {
    res.send(acdc)
});

routerAcdc.get('/:genero', (req, res) => {
    const genero = req.params.genero;
    const resultados = acdc.filter(acdc => acdc.genero === genero)

    if(resultados.length === 0){
        res.status(404).send(`No se encontraron resultados para ${genero}`)
    }

    if(req.query.ordenar === 'ventas'){
        res.send(JSON.stringify(resultados.sort((a,b) => b.ventas - a.ventas)));
    } else if(req.query.ordenar === 'canciones'){
        res.send(JSON.stringify(resultados.sort((a,b) => b.canciones - a.canciones)));
    } else {
        res.send(JSON.stringify(resultados));
    }
    
    res.send(JSON.stringify(resultados));
})

routerAcdc.get('/:genero/:recepcion', (req,res) => {
    const genero = req.params.genero;
    const recepcion = req.params.recepcion;
    const resultados = acdc.filter(acdc => acdc.genero === genero && acdc.recepcion === recepcion)

    if(resultados.length === 0){
        res.send(`No se encontraron resultados para ${genero} de la categoria ${recepcion}`)
    } else {
        res.send(JSON.stringify(resultados));
    }

    res.send(JSON.stringify(resultados));
})

routerAcdc.post('/', (req,res) => {
    let albumNuevo = req.body;
    acdc.push(albumNuevo);
    res.send(JSON.stringify(acdc)); 
} );

routerAcdc.put('/:id', (req,res) => {
    let albumCambiado = req.body;
    const id = req.params.id;

    const indice = acdc.findIndex(acdc => acdc.id == id);

    if(indice >= 0){
        acdc[indice] = albumCambiado;
    } else {
        res.status(404).send(`No se pudo encontrar el indice ${indice}`)
    }

    res.send(JSON.stringify(acdc));
})

routerAcdc.patch('/:id', (req,res) => {
    const albumPatcheado = req.body;
    const id = req.params.id; 

    const indice = acdc.findIndex(acdc => acdc.id == id);

    if (indice >= 0) {
       const albumAPatchear = acdc[indice]
       Object.assign(albumAPatchear,albumPatcheado);
    }

    res.send(JSON.stringify(acdc))
})

routerAcdc.delete('/:id', (req,res) => {
    const id = req.params.id;

    const indice = acdc.findIndex(acdc => acdc.id == id);

    if(indice >= 0) {
        acdc.splice(indice,1);
    }

    res.send(JSON.stringify(acdc));
})


module.exports = routerAcdc;