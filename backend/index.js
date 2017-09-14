'use strict';

const express = require('express');
const app = express();

app.get('/test.json', (req, res) => {
    res.send({
        name: 'test',
        data: ['test']
    })
})

app.listen(8080, () => { console.log('backend server start!'); })
