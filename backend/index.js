const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log('Local app executing at https://localhost:3000')
});

// http request - api rest
// CRUD - create, read, update e delete
// API REST - post, get, put e delete

app.get('/listar-horarios', ((req, res) => {
    res.send({
        id: 0,
        horario: '19h',
        disponivel: true
    },
        {
            id: 1,
            horario: '20h',
            disponivel: true
        },
        {
            id: 2,
            horario: '21h',
            disponivel: true
        })
}))