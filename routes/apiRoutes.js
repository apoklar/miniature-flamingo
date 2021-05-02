const fs = require('fs');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        let results = notes;
        if (req.query) {
          results = filterByQuery(req.query, results);
        }
        res.json(results);
    })
    
    app.post('/api/notes', (req, res) => {
        req.body.id = notes.length.toString();
        res.json(notes);
    })
    
    app.delete('/api/notes/:id', (req, res) => {
        deleteNote(notes, req.params.id);
        res.json(notes);
    })
};