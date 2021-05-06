const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) throw err 
            res.json(JSON.parse(data)) 
        })
    })
    
    app.post('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) throw err 
            req.body.id = uuidv4()
            const oldNotes = (JSON.parse(data)) 
            const newNotes = [req.body, ...oldNotes]
            
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes), err =>{
                if (err) throw err
                res.json(true)
            })
        })
    })
    
    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) throw err 
            const oldNotes = (JSON.parse(data))
            const newNotes = oldNotes.filter(note => note.id != req.params.id)

            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes), err =>{
                if (err) throw err
                res.json(true)
            })
    })  
})};